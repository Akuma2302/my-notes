// Chapter theme styling. Each subject names its own themes (subject.themes);
// the first three themes of a subject get the three card styles, in order.
const STYLES = [
  { cls: 'th-quality', c: 'p', icon: 'check' },
  { cls: 'th-reliability', c: 't', icon: 'lock' },
  { cls: 'th-control', c: 'c', icon: 'pulse' }
];
const KNOWN = { quality: 0, reliability: 1, control: 2 };

export function themeStyle(theme, subject) {
  const keys = Object.keys(subject?.themes || {});
  const i = keys.includes(theme) ? keys.indexOf(theme) : KNOWN[theme] ?? [...String(theme)].reduce((s, ch) => s + ch.charCodeAt(0), 0);
  const label = subject?.themes?.[theme] || String(theme).replace(/^\w/, ch => ch.toUpperCase());
  return { ...STYLES[i % STYLES.length], name: label };
}
