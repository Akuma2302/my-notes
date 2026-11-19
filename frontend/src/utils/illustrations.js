// Line-art illustrations drawn with currentColor, so they follow light/dark mode
// and can sit on black or white cards. Each returns an SVG string.

const wrap = (body, title, vb = '0 0 400 300') =>
  `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><title>${title}</title>${body}</svg>`;

const sparkle = (x, y, s = 8) => `<path d="M${x} ${y - s}v${2 * s}M${x - s} ${y}h${2 * s}" stroke-width="2.4"/>`;
const scribble = (x, y) => `<path d="M${x} ${y}c8-10 18 10 26 0s18 10 26 0" stroke-width="2.4"/>`;

/* Student at a laptop, graduation cap and notes floating around (welcome screen). */
export const studyIllustration = () => wrap(`
  <path d="M40 262h320"/>
  <path d="M110 92c-12 0-22 10-22 24 0 16 10 30 24 30s22-12 22-28c0-14-10-26-24-26z"/>
  <path d="M86 108c4-22 40-30 52-8"/>
  <circle cx="104" cy="118" r="6" stroke-width="2.4"/><circle cx="122" cy="118" r="6" stroke-width="2.4"/><path d="M110 118h6" stroke-width="2.4"/>
  <path d="M72 262c-4-46 8-88 40-100 22 8 34 30 38 56l40 14"/>
  <path d="M112 162v34" stroke-width="2.4"/>
  <path d="M184 262l18-74h126l-12 74z"/>
  <path d="M202 188h126l-12 74H184z" fill="currentColor"/>
  <path d="M252 214c6-6 14-6 18 0-4 8-12 10-18 0zM262 210l6-10" stroke="var(--knock)" stroke-width="2.6"/>
  <path d="M168 262h176"/>
  <path d="M170 64l50-20 50 20-50 20z" fill="currentColor"/>
  <path d="M196 74v18c14 10 34 10 48 0V74"/>
  <path d="M270 64v28" stroke-width="2.4"/><circle cx="270" cy="96" r="4" fill="currentColor"/>
  <path d="M312 40l26 26-38 38-26 4 4-26z"/><path d="M304 52l26 26" stroke-width="2.4"/>
  <path d="M38 196l34-12 10 30-34 12z" fill="currentColor"/>
  <path d="M300 150c10-6 30-4 34 10 4 12-6 22-18 22" stroke-width="2.4" stroke-dasharray="5 6"/>
  ${scribble(140, 36)}${sparkle(60, 64)}${sparkle(352, 132, 6)}${sparkle(150, 218, 5)}
`, 'Student studying with a laptop');

/* Magnifier over a checklist (quality chapters). */
export const qualityIllustration = () => wrap(`
  <path d="M40 270h320"/>
  <rect x="110" y="40" width="150" height="200" rx="14"/>
  <path d="M150 40v-10h70v10" />
  <path d="M136 92l10 10 18-20M180 94h56M136 142l10 10 18-20M180 144h56M136 192l10 10 18-20M180 194h40"/>
  <circle cx="270" cy="170" r="42" fill="currentColor"/>
  <circle cx="270" cy="170" r="28" stroke="var(--knock)" stroke-width="3"/>
  <path d="M300 200l40 40" stroke-width="10"/>
  <path d="M256 168l10 10 18-20" stroke="var(--knock)" stroke-width="3.4"/>
  ${sparkle(76, 80)}${sparkle(340, 70, 6)}${scribble(56, 210)}
`, 'Magnifying glass checking a list');

/* Shield, gears and heartbeat (reliability chapters). */
export const reliabilityIllustration = () => wrap(`
  <path d="M40 270h320"/>
  <path d="M200 34l86 30v62c0 64-40 104-86 124-46-20-86-60-86-124V64z"/>
  <path d="M200 58l64 22v46c0 48-30 80-64 96z" fill="currentColor"/>
  <path d="M150 140l34 34 64-72" stroke-width="6"/>
  <circle cx="320" cy="210" r="22"/><circle cx="320" cy="210" r="8" fill="currentColor"/>
  <path d="M320 178v-8M320 250v-8M288 210h-8M360 210h-8M297 187l-6-6M349 239l-6-6M297 233l-6 6M349 181l-6 6"/>
  <path d="M40 120h30l12-24 16 48 12-24h28" stroke-width="2.6"/>
  ${sparkle(84, 56)}${sparkle(330, 60, 6)}
`, 'Shield with a check mark');

/* Person presenting a rising chart (control / metrics chapters). */
export const controlIllustration = () => wrap(`
  <path d="M40 270h320"/>
  <rect x="170" y="40" width="190" height="140" rx="12"/>
  <path d="M200 160v-30M236 160v-52M272 160v-40M308 160v-76" stroke-width="12"/>
  <path d="M196 108l40-30 36 18 52-44" stroke-width="2.6"/><path d="M310 52h14v14" stroke-width="2.6"/>
  <path d="M265 180v40M240 220h50"/>
  <circle cx="98" cy="96" r="22"/>
  <path d="M80 86c10-14 32-14 38 2"/>
  <path d="M70 270l10-90c4-30 36-40 52-16l40-40"/>
  <path d="M100 196l-4 74M124 196l8 74" />
  <path d="M84 176c10 12 30 14 44 2" fill="currentColor"/>
  ${sparkle(330, 214, 6)}${sparkle(60, 40)}${scribble(190, 236)}
`, 'Person presenting a rising chart');

/* Stack of books with a plant (profile / empty states). */
export const booksIllustration = () => wrap(`
  <path d="M40 270h320"/>
  <rect x="110" y="226" width="180" height="44" rx="8" fill="currentColor"/>
  <rect x="126" y="186" width="160" height="40" rx="8"/>
  <rect x="116" y="146" width="168" height="40" rx="8" fill="currentColor"/>
  <path d="M142 206h110M146 248h40" stroke="var(--knock)"/>
  <path d="M140 166h120" stroke="var(--knock)"/>
  <path d="M310 270v-50h36v50z"/><path d="M328 220c-4-30-26-40-36-36 4 20 18 34 36 36zM328 220c2-34 22-48 34-46-2 22-16 40-34 46z"/>
  <path d="M170 146l30-40 30 40" stroke-width="2.6"/><circle cx="200" cy="96" r="8" fill="currentColor"/>
  ${sparkle(80, 120)}${sparkle(330, 120, 6)}${scribble(60, 200)}
`, 'Stack of books');

export const themeIllustration = theme =>
  ({ quality: qualityIllustration, reliability: reliabilityIllustration, control: controlIllustration }[theme] || booksIllustration)();
