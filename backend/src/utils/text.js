export const stripHtml = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
export const parseJson = value => (value == null ? null : JSON.parse(value));
export const snippet = (text, index, before = 40, after = 80) => text.slice(Math.max(0, index - before), index + after).trim();
