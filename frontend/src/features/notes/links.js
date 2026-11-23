// Links inside sticky notes: tidy up what was pasted, work out a preview (YouTube thumbnail or
// the image itself), and find web addresses typed in the note text.

export const URL_RE = /(https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"]|#\/[^\s<]+)/g;

// "www.x.com" -> "https://www.x.com"; "#/c/ob3/map" stays an in-app link. Returns null if unusable.
export function cleanUrl(raw) {
  const s = raw.trim();
  if (!s) return null;
  if (s.startsWith('#/')) return s;
  try {
    const u = new URL(/^[a-z][\w+.-]*:/i.test(s) ? s : `https://${s}`);
    return /^https?:$/.test(u.protocol) && u.hostname.includes('.') ? u.href : null;
  } catch {
    return null;
  }
}

const youtubeId = u => {
  if (/(^|\.)youtu\.be$/.test(u.hostname)) return u.pathname.slice(1, 12);
  if (/(^|\.)youtube\.com$/.test(u.hostname)) return u.searchParams.get('v') || u.pathname.match(/\/(?:shorts|embed|live)\/([\w-]{11})/)?.[1];
  return null;
};

// What to show for a link: a label, and a picture when there is one.
export function linkInfo(url) {
  if (url.startsWith('#/')) return { label: 'In this app', sub: url.slice(1), internal: true };
  const u = new URL(url);
  const host = u.hostname.replace(/^www\./, '');
  const yt = youtubeId(u);
  if (yt) return { label: 'YouTube video', sub: host, thumb: `https://i.ytimg.com/vi/${yt}/mqdefault.jpg` };
  if (/\.(png|jpe?g|gif|webp|svg)$/i.test(u.pathname)) return { label: 'Image', sub: host, thumb: url };
  return { label: host, sub: decodeURIComponent(u.pathname + u.search).replace(/\/$/, '') || '' };
}

export const linkProps = url => (url.startsWith('#/') ? { href: url } : { href: url, target: '_blank', rel: 'noopener noreferrer' });
