// Turns a note's page ("/c/ob3/tutorial") into a readable place: "Ch 3 · Perceiving…" / "Org Behaviour · Tutorial tab".
import { chapterTabs } from '../../utils/constants.js';

const PAGES = {
  '': 'Home', subjects: 'Subjects', chapters: 'Subjects', connect: 'Connect', bigmap: 'Mind maps', gallery: 'Pictures',
  cases: 'Company cases', practice: 'Practice', cards: 'Flashcards', quiz: 'Full quiz', tools: 'Calculators',
  me: 'Me', saved: 'Me', notes: 'My notes', search: 'Search', se: 'SE essentials'
};

export function describePage(path, { chapterById = {}, subjectById = {}, skillById = {} }) {
  const [first = '', a, b] = path.split('/').filter(Boolean);
  if (first === 'c' && chapterById[a]) {
    const c = chapterById[a];
    const tab = chapterTabs(c).find(([k]) => k === (b || 'note'))?.[1] || 'Note';
    return { title: `Ch ${c.num} · ${c.short || c.title}`, sub: `${subjectById[c.subject]?.short || ''} · ${tab} tab`, subject: c.subject, num: c.num };
  }
  if (first === 's' && subjectById[a]) return { title: subjectById[a].title, sub: 'Subject page', subject: a };
  if (first === 'skill' && skillById[a]) return { title: skillById[a].title, sub: 'SE essentials', subject: 'se' };
  return { title: PAGES[first] || 'App page', sub: 'App page', subject: null };
}

// Ask the next page to scroll to a note and pop out its preview (used by "My notes").
let pending = null;
export const focusNote = (id, page) => { pending = { id, page }; };
export const pendingFocus = page => (pending?.page === page ? pending.id : null);
export const clearFocus = () => { pending = null; };
