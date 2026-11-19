// Case-insensitive LIKE search across notes, cases, cards, code and skills.
import { db } from '../config/database.js';

// Escape LIKE wildcards so a search for "100%" matches literally. Escape char is "!".
const like = s => `%${s.replace(/[%_!]/g, ch => '!' + ch)}%`;
const E = "ESCAPE '!'";
const q = {
  chapters: db.prepare(`SELECT c.id, c.num, c.sections, s.short AS subject FROM chapters c JOIN subjects s ON s.id = c.subject_id WHERE c.sections LIKE @t ${E} ORDER BY s.position, c.num`),
  cases: db.prepare(`SELECT k.company, k.title, c.id, c.num, s.short AS subject FROM cases k JOIN chapters c ON c.id = k.chapter_id JOIN subjects s ON s.id = c.subject_id
                     WHERE k.company LIKE @t ${E} OR k.title LIKE @t ${E} OR k.story LIKE @t ${E} ORDER BY c.num`),
  cards: db.prepare(`SELECT f.question, c.id, c.num, s.short AS subject FROM flashcards f JOIN chapters c ON c.id = f.chapter_id JOIN subjects s ON s.id = c.subject_id
                     WHERE f.question LIKE @t ${E} OR f.answer LIKE @t ${E} ORDER BY c.num`),
  code: db.prepare(`SELECT k.title, c.id, c.num, s.short AS subject FROM code_examples k JOIN chapters c ON c.id = k.chapter_id JOIN subjects s ON s.id = c.subject_id
                    WHERE k.title LIKE @t ${E} OR k.explain LIKE @t ${E} ORDER BY c.num`),
  skills: db.prepare(`SELECT id, title FROM skills WHERE title LIKE @t ${E} OR what LIKE @t ${E} OR learn LIKE @t ${E} ORDER BY position`)
};

export const searchRepository = {
  chapters: t => q.chapters.all({ t: like(t) }),
  cases: t => q.cases.all({ t: like(t) }),
  cards: t => q.cards.all({ t: like(t) }),
  code: t => q.code.all({ t: like(t) }),
  skills: t => q.skills.all({ t: like(t) })
};
