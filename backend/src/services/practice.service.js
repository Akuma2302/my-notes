import { practiceRepository } from '../repositories/practice.repository.js';

export const practiceService = {
  flashcards: filter => practiceRepository.findFlashcards(filter).map(r => ({
    id: r.id, chapterId: r.chapter_id, chapterNum: r.num, question: r.question, answer: r.answer, lecture: r.lecture
  })),
  quiz: filter => practiceRepository.findQuiz(filter).map(r => ({
    id: r.id, chapterId: r.chapter_id, chapterNum: r.num, question: r.question,
    options: JSON.parse(r.options), answer: r.answer_index, why: r.explanation, lecture: r.lecture
  })),
  cases: () => practiceRepository.findCases().map(r => ({
    chapterId: r.chapter_id, chapterNum: r.num, co: r.company, logo: r.logo, color: r.color, year: r.year, title: r.title, story: r.story, lesson: r.lesson
  }))
};
