// Renders the app icons from the SVGs in public/.
// Run after changing an icon SVG:  npm run icons
import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const pub = new URL('../public/', import.meta.url);
const svg = name => readFileSync(new URL(name, pub), 'utf8');

function png(source, size) {
  return new Resvg(svg(source), { fitTo: { mode: 'width', value: size } }).render().asPng();
}

const outputs = [
  ['favicon-16.png', 'icon-small.svg', 16],
  ['favicon-32.png', 'icon-small.svg', 32],
  ['favicon-48.png', 'icon-small.svg', 48],
  ['apple-touch-icon.png', 'icon-maskable.svg', 180],    // iPhone/iPad home screen (iOS rounds corners)
  ['icon-192.png', 'icon.svg', 192],                       // Android, Chrome install
  ['icon-512.png', 'icon.svg', 512],
  ['icon-maskable-192.png', 'icon-maskable.svg', 192],     // Android adaptive icons (full bleed)
  ['icon-maskable-512.png', 'icon-maskable.svg', 512]
];

const made = {};
for (const [file, source, size] of outputs) {
  made[file] = png(source, size);
  writeFileSync(new URL(file, pub), made[file]);
}

// favicon.ico holding 16, 32 and 48 px PNG images (the ICO format allows PNG entries).
const images = ['favicon-16.png', 'favicon-32.png', 'favicon-48.png'].map(f => made[f]);
const sizes = [16, 32, 48];
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(0, 0);                 // reserved
header.writeUInt16LE(1, 2);                 // type: icon
header.writeUInt16LE(images.length, 4);     // image count
let offset = header.length;
images.forEach((img, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(sizes[i], e);           // width
  header.writeUInt8(sizes[i], e + 1);       // height
  header.writeUInt8(0, e + 2);              // palette
  header.writeUInt8(0, e + 3);              // reserved
  header.writeUInt16LE(1, e + 4);           // colour planes
  header.writeUInt16LE(32, e + 6);          // bits per pixel
  header.writeUInt32LE(img.length, e + 8);  // data size
  header.writeUInt32LE(offset, e + 12);     // data offset
  offset += img.length;
});
writeFileSync(new URL('favicon.ico', pub), Buffer.concat([header, ...images]));

console.log('Icons written to public/:', [...Object.keys(made), 'favicon.ico'].join(', '));
