export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const stripHtml = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
