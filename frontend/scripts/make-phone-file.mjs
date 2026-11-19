// After the static build: dist-phone/index.html is what Netlify serves (real icon files + manifest).
// sqa-study.html is the copy you send to your phone, so its icons are embedded inside the file.
import { readFileSync, writeFileSync } from 'node:fs';

const dist = new URL('../dist-phone/', import.meta.url);
const pub = new URL('../public/', import.meta.url);
const b64 = (name, type) => `data:${type};base64,` + readFileSync(new URL(name, pub)).toString('base64');

const html = readFileSync(new URL('index.html', dist), 'utf8')
  .replace('href="./favicon.ico"', `href="${b64('favicon-48.png', 'image/png')}"`)
  .replace('href="./icon-small.svg"', `href="${b64('icon-small.svg', 'image/svg+xml')}"`)
  .replace('href="./apple-touch-icon.png"', `href="${b64('apple-touch-icon.png', 'image/png')}"`)
  .replace(/\s*<link rel="manifest"[^>]*>/, '');

writeFileSync(new URL('sqa-study.html', dist), html);
console.log('Wrote dist-phone/sqa-study.html with embedded icons');
