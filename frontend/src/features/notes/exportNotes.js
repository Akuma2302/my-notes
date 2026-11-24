// Export sticky notes to files: PDF (through the browser's "Save as PDF"), Word, web page,
// Markdown and plain text, plus a backup file that can be restored on this or another device.
// Photos are copied into the file itself so every export works on its own.
import { NOTE_COLORS } from '../../redux/notesSlice.js';
import { clean, htmlToText } from './richtext.js';
import { cleanUrl } from './links.js';
import { photoBlob, storePhoto } from './images.js';

const NEON = { lime: '#C6F23A', cyan: '#3DE0F0', pink: '#FF5AD1', orange: '#FF9F3A' };
const BACKUP_KIND = 'sqa-study-notes';

const today = () => new Date().toISOString().slice(0, 10);
const when = t => (t ? new Date(t).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const appUrl = href => (href.startsWith('#/') ? location.href.split('#')[0] + href : href);   // in-app links work from the file too

const toDataUrl = blob => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(r.result);
  r.onerror = () => rej(r.error);
  r.readAsDataURL(blob);
});

const parse = html => new DOMParser().parseFromString(`<body>${html || ''}</body>`, 'text/html').body;

// Copy stored photos into the HTML as data URLs.
async function inlinePhotos(html) {
  const body = parse(clean(html));
  for (const img of body.querySelectorAll('img[data-img]')) {
    const blob = await photoBlob(img.dataset.img);
    if (blob) img.setAttribute('src', await toDataUrl(blob));
    else img.replaceWith(body.ownerDocument.createTextNode('[photo missing]'));
    img.removeAttribute('data-img');
  }
  return body;
}

// Note body for documents: tick boxes as ☑/☐ text, highlights and links made portable.
async function noteBody(note) {
  const body = await inlinePhotos(note.html);
  const hex = NEON[note.color] || NEON.lime;
  body.querySelectorAll('ul[data-check] > li').forEach(li => li.prepend(li.hasAttribute('data-done') ? '☑ ' : '☐ '));
  body.querySelectorAll('mark').forEach(m => m.setAttribute('style', `background:${hex};color:#111;padding:0 2px`));
  body.querySelectorAll('a').forEach(a => a.setAttribute('href', appUrl(a.getAttribute('href'))));
  return body.innerHTML;
}

const CSS = `
.nx{font-family:-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#121214;max-width:720px;margin:0 auto;padding:24px;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.nx h1{font-size:26px;margin:0}
.nx .meta{color:#777;font-size:12px;margin:4px 0 18px}
.nx-page{margin:26px 0 6px;padding-bottom:6px;border-bottom:2px solid #121214;break-after:avoid}
.nx-page h2{font-size:17px;margin:0}
.nx-page small{color:#777;font-size:12px}
.nx-note{background:#f6f6f4;border-radius:10px;padding:10px 14px;margin:10px 0;break-inside:avoid}
.nx-when{font-size:11px;color:#888;margin-bottom:4px}
.nx-body h2{font-size:18px;margin:4px 0}
.nx-body p{margin:0 0 6px}
.nx-body ul,.nx-body ol{margin:0 0 6px;padding-left:22px}
.nx-body ul[data-check]{list-style:none;padding-left:0}
.nx-body li[data-done]{text-decoration:line-through;color:#888}
.nx-body img{max-width:100%;max-height:420px;border-radius:8px;display:block;margin:6px 0}
.nx-body a,.nx-links a{color:#121214;font-weight:700}
.nx-links{margin:6px 0 0;padding-left:18px;font-size:13px}
@page{margin:14mm}`;

// One HTML document for all exports that keep formatting (PDF, Word, web page).
export async function buildDocument(groups, { word = false } = {}) {
  const total = groups.reduce((s, g) => s + g.notes.length, 0);
  let html = `<div class="nx"><h1>My notes</h1><div class="meta">${total} note${total === 1 ? '' : 's'} · exported ${esc(when(Date.now()))}</div>`;
  for (const g of groups) {
    html += `<div class="nx-page"><h2>${esc(g.info.title)}</h2><small>${esc(g.info.sub)}</small></div>`;
    for (const n of g.notes) {
      const hex = NEON[n.color] || NEON.lime;
      const links = (n.links || []).map(l => `<li><a href="${esc(appUrl(l))}">${esc(l)}</a></li>`).join('');
      // Word ignores CSS variables and most borders on divs, so the colour bar is inline
      html += `<div class="nx-note" style="border-left:6px solid ${hex}"><div class="nx-when">${esc(when(n.updated || n.created))}</div>`
        + `<div class="nx-body">${await noteBody(n) || '<p><i>Empty note</i></p>'}</div>`
        + (links ? `<ul class="nx-links">${links}</ul>` : '') + '</div>';
    }
  }
  html += '</div>';
  if (word) {
    return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">`
      + `<head><meta charset="utf-8"><title>My notes</title><style>${CSS}</style></head><body>${html}</body></html>`;
  }
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>My notes</title><style>${CSS}</style></head><body>${html}</body></html>`;
}

// ---------- Markdown / plain text ----------
function toMarkdown(node, plain) {
  let out = '';
  for (const c of node.childNodes) {
    if (c.nodeType === 3) { out += c.textContent; continue; }
    if (c.nodeType !== 1) continue;
    const inner = () => toMarkdown(c, plain);
    const wrap = m => { const s = inner(); return plain || !s.trim() ? s : `${m}${s}${m}`; };
    switch (c.tagName) {
      case 'H2': case 'H3': out += `\n${plain ? '' : '## '}${inner().trim()}\n\n`; break;
      case 'P': case 'DIV': out += `${inner().trim()}\n\n`; break;
      case 'BR': out += '\n'; break;
      case 'B': case 'STRONG': out += wrap('**'); break;
      case 'I': case 'EM': out += wrap('*'); break;
      case 'S': case 'STRIKE': out += wrap('~~'); break;
      case 'MARK': out += wrap('=='); break;
      case 'A': { const href = appUrl(c.getAttribute('href') || ''); out += plain ? `${inner()} (${href})` : `[${inner()}](${href})`; break; }
      case 'IMG': out += '\n[photo]\n'; break;
      case 'BLOCKQUOTE': out += inner().trim().split('\n').map(l => `> ${l}`).join('\n') + '\n\n'; break;
      case 'UL': case 'OL':
        [...c.children].forEach((li, i) => {
          const mark = c.hasAttribute('data-check') ? (li.hasAttribute('data-done') ? '- [x] ' : '- [ ] ') : c.tagName === 'OL' ? `${i + 1}. ` : '- ';
          out += mark + toMarkdown(li, plain).trim().replace(/\n+/g, ' ') + '\n';
        });
        out += '\n';
        break;
      default: out += inner();
    }
  }
  return out;
}

function buildText(groups, plain) {
  const total = groups.reduce((s, g) => s + g.notes.length, 0);
  const count = `${total} note${total === 1 ? '' : 's'}`;
  let out = plain ? `MY NOTES\n${count} · exported ${when(Date.now())}\n` : `# My notes\n\n_${count} · exported ${when(Date.now())}_\n`;
  for (const g of groups) {
    out += plain ? `\n\n==== ${g.info.title} ====\n${g.info.sub}\n` : `\n\n## ${g.info.title}\n_${g.info.sub}_\n`;
    for (const n of g.notes) {
      const body = toMarkdown(parse(clean(n.html)), plain).replace(/\n{3,}/g, '\n\n').trim() || 'Empty note';
      out += plain ? `\n--- ${when(n.updated || n.created)} ---\n${body}\n` : `\n---\n\n**${when(n.updated || n.created)}**\n\n${body}\n`;
      for (const l of n.links || []) out += plain ? `Link: ${appUrl(l)}\n` : `- 🔗 <${appUrl(l)}>\n`;
    }
  }
  return out.trim() + '\n';
}

// ---------- saving files ----------
function download(name, type, data) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

// PDF: show a clean printable copy and open the print dialog ("Save as PDF").
async function printPdf(groups) {
  const page = await buildDocument(groups);
  const doc = new DOMParser().parseFromString(page, 'text/html');
  const box = document.createElement('div');
  box.id = 'notes-print';
  box.innerHTML = `<style>${CSS}</style>${doc.body.innerHTML}`;
  document.body.append(box);
  document.documentElement.classList.add('print-notes');
  const title = document.title;
  document.title = `my-notes-${today()}`;                    // becomes the PDF's file name
  await Promise.all([...box.querySelectorAll('img')].map(img => (img.complete ? null : new Promise(r => { img.onload = img.onerror = r; }))));
  const done = () => {
    document.documentElement.classList.remove('print-notes');
    box.remove();
    document.title = title;
    removeEventListener('afterprint', done);
  };
  addEventListener('afterprint', done);
  window.print();
  setTimeout(() => { if (!matchMedia('print').matches) done(); }, 1000);   // browsers without afterprint
}

export async function exportNotes(format, groups) {
  const base = `my-notes-${today()}`;
  switch (format) {
    case 'pdf': return printPdf(groups);
    case 'doc': return download(`${base}.doc`, 'application/msword', '﻿' + await buildDocument(groups, { word: true }));
    case 'html': return download(`${base}.html`, 'text/html', await buildDocument(groups));
    case 'md': return download(`${base}.md`, 'text/markdown', buildText(groups, false));
    case 'txt': return download(`${base}.txt`, 'text/plain', buildText(groups, true));
    case 'backup': {
      const notes = [];
      for (const g of groups) for (const n of g.notes) notes.push({ ...n, html: (await inlinePhotos(n.html)).innerHTML });
      return download(`${base}-backup.json`, 'application/json', JSON.stringify({ kind: BACKUP_KIND, version: 1, exported: Date.now(), notes }, null, 1));
    }
    default: throw new Error(`Unknown format ${format}`);
  }
}

// ---------- restore ----------
const num = (v, d) => (typeof v === 'number' && Number.isFinite(v) ? v : d);

// Read a backup file and return clean notes, with photos moved back into device storage.
export async function readBackup(file) {
  const data = JSON.parse(await file.text());
  if (data?.kind !== BACKUP_KIND || !Array.isArray(data.notes)) throw new Error('This is not a notes backup file.');
  const out = [];
  for (const n of data.notes) {
    if (typeof n?.id !== 'string' || typeof n.page !== 'string' || !n.page.startsWith('/')) continue;
    const body = parse(clean(String(n.html || '')));
    for (const img of body.querySelectorAll('img[src^="data:"]')) {
      const id = await storePhoto(await (await fetch(img.getAttribute('src'))).blob());
      if (id) { img.removeAttribute('src'); img.setAttribute('data-img', id); }
    }
    const html = clean(body.innerHTML);
    const a = n.anchor || {};
    out.push({
      id: n.id.slice(0, 40),
      page: n.page.slice(0, 200),
      anchor: { path: Array.isArray(a.path) ? a.path.filter(Number.isInteger).slice(0, 30) : [], dy: num(a.dy, 120), y: num(a.y, 120) },
      x: Math.min(1, Math.max(0, num(n.x, 0.4))),
      color: NOTE_COLORS.includes(n.color) ? n.color : 'lime',
      html,
      text: htmlToText(html),
      links: (Array.isArray(n.links) ? n.links : []).map(l => cleanUrl(String(l))).filter(Boolean),
      open: false,
      created: num(n.created, Date.now()),
      updated: num(n.updated, Date.now())
    });
  }
  return out;
}
