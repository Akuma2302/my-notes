// Turns database rows into the chapter shape the frontend uses.
import { parseJson } from '../utils/text.js';

export const THEMES = ['quality', 'reliability', 'control'];

export const toChapterSummary = row => ({
  id: row.id, subject: row.subject_id, num: row.num, theme: row.theme, title: row.title, short: row.short,
  lecture: row.lecture, summary: row.summary, tool: row.tool ?? undefined
});

export const toChapter = (row, parts) => ({
  ...toChapterSummary(row),
  sections: parseJson(row.sections),
  mindmaps: parseJson(row.mindmaps),
  links: parts.links.map(l => ({ to: l.to_id, topic: l.topic, text: l.text })),
  cases: parts.cases.map(k => ({ co: k.company, logo: k.logo, color: k.color, year: k.year, title: k.title, story: k.story, lesson: k.lesson })),
  code: parts.code.map(k => ({ title: k.title, lang: k.lang, explain: k.explain, src: k.source })),
  cards: parts.cards.map(k => [k.question, k.answer]),
  quiz: parts.quiz.map(q => ({ q: q.question, o: parseJson(q.options), a: q.answer_index, why: q.explanation })),
  beyond: parts.skills.map(s => ({ skill: s.skill_id, why: s.why })),
  ...(parts.tutorial ? { tutorial: toTutorial(parts.tutorial, parts.tutorialQs) } : {})
});

const toTutorial = (t, qs) => ({
  no: t.number, title: t.title, ...(t.source ? { source: t.source } : {}), ...(t.intro ? { intro: t.intro } : {}),
  items: qs.map(x => ({ n: x.label, ...(x.kind !== 'question' ? { kind: x.kind } : {}), q: x.question, ...(x.marks != null ? { m: x.marks } : {}), a: x.answer }))
});

export const toCluster = row => ({ subject: row.subject_id, t: row.title, c: row.color, chs: parseJson(row.chapters), why: row.why });
