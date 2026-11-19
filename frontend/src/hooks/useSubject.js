// The subject currently picked on the tabs, with its chapters and theme helper.
import { useSelector } from 'react-redux';
import { useContent } from './useContent.js';
import { selectSubject } from '../redux/progressSlice.js';
import { themeStyle } from '../utils/themes.js';

// Practice pages need notes, so a coming-soon pick falls back to the first subject
// that has chapters. Home passes { allowSoon: true } to show the coming-soon card.
export function useSubject(id, { allowSoon = false } = {}) {
  const { subjects, subjectById, chaptersOf } = useContent();
  const picked = useSelector(selectSubject);
  let subject = subjectById[id || picked] || subjects[0];
  if (!allowSoon && subject.status !== 'active') subject = subjects.find(x => x.status === 'active') || subject;
  return { subject, chapters: chaptersOf(subject.id), theme: t => themeStyle(t, subject) };
}

// Theme style for any chapter, using that chapter's own subject.
export function useChapterTheme() {
  const { subjectById } = useContent();
  return c => themeStyle(c.theme, subjectById[c.subject]);
}
