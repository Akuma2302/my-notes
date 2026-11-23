// Remember WHERE a sticky note sits: the page element it was dropped on (as a path of child
// indexes from the page root) plus the distance from that element's top. This keeps a note next
// to "its" paragraph or picture on any screen size, even when text wraps differently.

const pathTo = (root, el) => {
  const path = [];
  while (el && el !== root) {
    const parent = el.parentElement;
    if (!parent) return null;
    path.unshift(Array.prototype.indexOf.call(parent.children, el));
    el = parent;
  }
  return el === root ? path : null;
};

const resolve = (root, path) => {
  let el = root;
  for (const i of path) {
    el = el?.children[i];
    if (!el) return null;
  }
  return el;
};

// Element under a screen point, ignoring the notes themselves; inline bits (b, span) climb to their block.
function elementAt(root, layer, clientX, clientY) {
  const hit = document.elementsFromPoint(clientX, clientY).find(e => root.contains(e) && !layer.contains(e) && e !== root);
  let el = hit || null;
  while (el && el !== root && getComputedStyle(el).display.startsWith('inline')) el = el.parentElement;
  return el;
}

// Anchor for a note whose top-left corner is at (clientX, clientY).
export function makeAnchor(root, layer, clientX, clientY) {
  const rootTop = root.getBoundingClientRect().top;
  const el = elementAt(root, layer, clientX + 8, clientY + 6);
  const path = el && el !== root ? pathTo(root, el) : null;
  const y = clientY - rootTop;                                   // fallback: distance from page top
  if (!path) return { path: [], dy: y, y };
  return { path, dy: clientY - el.getBoundingClientRect().top, y };
}

// Top of a note in page coordinates (relative to the page root).
export function topOf(root, anchor) {
  const rootTop = root.getBoundingClientRect().top;
  const el = anchor.path.length ? resolve(root, anchor.path) : null;
  if (!el) return anchor.y;                                       // content changed: use the old spot
  return el.getBoundingClientRect().top - rootTop + anchor.dy;
}
