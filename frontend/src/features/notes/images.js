// Photos inside notes. They are shrunk, then kept in IndexedDB on this device (localStorage is
// far too small for pictures); the note's HTML only stores <img data-img="id">.
// If IndexedDB is unavailable (some phones block it for files opened from storage), the photo
// is shrunk harder and kept inline in the note instead.

const DB = 'sqa-notes';
const STORE = 'images';
let dbPromise;
const urls = new Map();                 // id -> object URL, so each photo is read once

const openDb = () => (dbPromise ||= new Promise((resolve, reject) => {
  const req = indexedDB.open(DB, 1);
  req.onupgradeneeded = () => req.result.createObjectStore(STORE);
  req.onsuccess = () => resolve(req.result);
  req.onerror = () => reject(req.error);
}));

async function run(mode, fn) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const req = fn(tx.objectStore(STORE));
    tx.oncomplete = () => resolve(req?.result);
    tx.onerror = () => reject(tx.error);
  });
}

// Resize to fit maxSide and re-encode as JPEG (keeps notes small; phone photos are 3–8 MB).
async function shrink(file, maxSide, quality) {
  if (file.type === 'image/gif') return file;                      // keep animations
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';                                          // transparent PNGs get a white page
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  return new Promise(res => canvas.toBlob(b => res(b || file), 'image/jpeg', quality));
}

const toDataUrl = blob => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(r.result);
  r.onerror = () => rej(r.error);
  r.readAsDataURL(blob);
});

// Returns the attributes for the new <img>: { 'data-img': id } or, as a fallback, { src: dataUrl }.
export async function savePhoto(file) {
  try {
    const blob = await shrink(file, 1600, 0.82);
    const id = `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
    await run('readwrite', s => s.put(blob, id));
    urls.set(id, URL.createObjectURL(blob));
    return { 'data-img': id };
  } catch {
    const small = await shrink(file, 900, 0.7).catch(() => file);
    return { src: await toDataUrl(small) };
  }
}

export async function photoUrl(id) {
  if (urls.has(id)) return urls.get(id);
  const blob = await run('readonly', s => s.get(id)).catch(() => null);
  if (!blob) return null;
  const url = URL.createObjectURL(blob);
  urls.set(id, url);
  return url;
}

export function deletePhotos(ids) {
  ids.forEach(id => {
    if (urls.has(id)) { URL.revokeObjectURL(urls.get(id)); urls.delete(id); }
    run('readwrite', s => s.delete(id)).catch(() => {});
  });
}

// Fill in every <img data-img> inside an element with its stored photo.
export function showPhotos(root) {
  root?.querySelectorAll('img[data-img]').forEach(async img => {
    if (img.getAttribute('src')) return;
    const url = await photoUrl(img.dataset.img);
    if (url) img.src = url;
    else img.classList.add('missing');
  });
}
