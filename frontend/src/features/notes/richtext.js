// Note content is a small subset of HTML. Everything saved or shown goes through clean(), which
// keeps only formatting tags and safe links/photos, so pasted or stored HTML can never run code.
import { URL_RE, cleanUrl } from './links.js';

const KEEP = new Set(['P', 'DIV', 'BR', 'B', 'STRONG', 'I', 'EM', 'U', 'S', 'STRIKE', 'H2', 'H3', 'UL', 'OL', 'LI', 'A', 'IMG', 'MARK', 'BLOCKQUOTE']);
const DROP = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'TEMPLATE', 'SVG', 'MATH', 'NOSCRIPT', 'TITLE', 'META', 'LINK', 'FORM', 'INPUT', 'BUTTON', 'SELECT', 'TEXTAREA']);
const DATA_IMG = /^data:image\/(png|jpe?g|webp|gif);base64,[a-z0-9+/=]+$/i;

function cleanNode(node, doc) {
  for (const child of [...node.childNodes]) {
    if (child.nodeType === 3) continue;                          // text
    if (child.nodeType !== 1) { child.remove(); continue; }      // comments etc.
    const tag = child.tagName;
    if (DROP.has(tag)) { child.remove(); continue; }
    cleanNode(child, doc);
    if (!KEEP.has(tag)) { child.replaceWith(...child.childNodes); continue; }   // unwrap span, font…

    const keep = {};
    if (tag === 'A') {
      const url = cleanUrl(child.getAttribute('href') || '');
      if (!url) { child.replaceWith(...child.childNodes); continue; }
      keep.href = url;
    } else if (tag === 'IMG') {
      const id = child.getAttribute('data-img');
      const src = child.getAttribute('src') || '';
      if (id && /^[\w-]{1,40}$/.test(id)) keep['data-img'] = id;
      else if (DATA_IMG.test(src)) keep.src = src;
      else { child.remove(); continue; }
    } else if (tag === 'UL' && child.hasAttribute('data-check')) keep['data-check'] = '';
    else if (tag === 'LI' && child.hasAttribute('data-done')) keep['data-done'] = '';

    for (const a of [...child.attributes]) child.removeAttribute(a.name);
    for (const [k, v] of Object.entries(keep)) child.setAttribute(k, v);
  }
}

export function clean(html) {
  const doc = new DOMParser().parseFromString(`<body>${html || ''}</body>`, 'text/html');
  cleanNode(doc.body, doc);
  return doc.body.innerHTML.replace(/^(<p><br><\/p>)+$/, '');
}

const escape = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Plain text from older notes -> HTML, with web addresses made into links.
export function textToHtml(text = '') {
  if (!text) return '';
  return text.split('\n').map(line => {
    const parts = line.split(URL_RE).map((p, i) => (i % 2 ? `<a href="${escape(p)}">${escape(p.replace(/^https?:\/\/(www\.)?/, ''))}</a>` : escape(p)));
    return `<p>${parts.join('') || '<br>'}</p>`;
  }).join('');
}

// Plain text version (for the dot's label and empty checks).
export function htmlToText(html) {
  const doc = new DOMParser().parseFromString(`<body>${html || ''}</body>`, 'text/html');
  doc.body.querySelectorAll('p,div,li,h2,h3,br,blockquote').forEach(el => el.append('\n'));
  return doc.body.textContent.replace(/\n{3,}/g, '\n\n').trim();
}

export const photoIds = html => [...(html || '').matchAll(/data-img="([\w-]+)"/g)].map(m => m[1]);
export const hasPhotos = html => /<img\b/.test(html || '');
