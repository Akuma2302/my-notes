// All SQL for chapters lives here.
import { db } from '../config/database.js';

const q = {
  all: db.prepare('SELECT c.* FROM chapters c JOIN subjects s ON s.id = c.subject_id ORDER BY s.position, c.num'),
  bySubject: db.prepare('SELECT * FROM chapters WHERE subject_id = ? ORDER BY num'),
  byId: db.prepare('SELECT * FROM chapters WHERE id = ?'),
  links: db.prepare('SELECT * FROM chapter_links WHERE from_id = ? ORDER BY position'),
  allLinks: db.prepare('SELECT * FROM chapter_links ORDER BY from_id, position'),
  cases: db.prepare('SELECT * FROM cases WHERE chapter_id = ? ORDER BY position'),
  code: db.prepare('SELECT * FROM code_examples WHERE chapter_id = ? ORDER BY position'),
  cards: db.prepare('SELECT * FROM flashcards WHERE chapter_id = ? ORDER BY position'),
  quiz: db.prepare('SELECT * FROM quiz_questions WHERE chapter_id = ? ORDER BY position'),
  skills: db.prepare('SELECT * FROM chapter_skills WHERE chapter_id = ? ORDER BY position'),
  tutorial: db.prepare('SELECT * FROM tutorials WHERE chapter_id = ?'),
  tutorialQs: db.prepare('SELECT * FROM tutorial_questions WHERE chapter_id = ? ORDER BY position'),
  clusters: db.prepare('SELECT * FROM theme_clusters ORDER BY subject_id, position')
};

export const chapterRepository = {
  findAll: () => q.all.all(),
  findBySubject: subject => q.bySubject.all(subject),
  findById: id => q.byId.get(id),
  findAllLinks: () => q.allLinks.all(),
  findClusters: () => q.clusters.all(),
  findParts: id => ({
    links: q.links.all(id), cases: q.cases.all(id), code: q.code.all(id),
    cards: q.cards.all(id), quiz: q.quiz.all(id), skills: q.skills.all(id),
    tutorial: q.tutorial.get(id), tutorialQs: q.tutorialQs.all(id)
  })
};
