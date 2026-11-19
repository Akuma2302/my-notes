import { db } from '../config/database.js';

const q = {
  cards: db.prepare(`SELECT f.*, c.num, c.lecture FROM flashcards f JOIN chapters c ON c.id = f.chapter_id
                     WHERE (@chapter IS NULL OR f.chapter_id = @chapter) AND (@subject IS NULL OR c.subject_id = @subject) ORDER BY c.subject_id, c.num, f.position`),
  quiz: db.prepare(`SELECT qq.*, c.num, c.lecture FROM quiz_questions qq JOIN chapters c ON c.id = qq.chapter_id
                    WHERE (@chapter IS NULL OR qq.chapter_id = @chapter) AND (@subject IS NULL OR c.subject_id = @subject) ORDER BY c.subject_id, c.num, qq.position`),
  cases: db.prepare(`SELECT k.*, c.num FROM cases k JOIN chapters c ON c.id = k.chapter_id ORDER BY c.num, k.position`)
};

export const practiceRepository = {
  findFlashcards: ({ chapter, subject }) => q.cards.all({ chapter: chapter ?? null, subject: subject ?? null }),
  findQuiz: ({ chapter, subject }) => q.quiz.all({ chapter: chapter ?? null, subject: subject ?? null }),
  findCases: () => q.cases.all()
};
