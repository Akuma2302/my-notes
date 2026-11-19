// Loads the lecture notes (seeds/data/*.js) into the database.
// Safe to run again: it clears the content tables first. The risks table
// (the student's own data) is left alone.
import { openDb } from '../db.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { skills, skillGroups } from './data/skills.js';
import { clusters } from './data/clusters.js';
import { subjects } from './data/subjects.js';

// Every data/chapters-*.js file is loaded, so adding a subject is just adding a file.
const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data');
const files = fs.readdirSync(dataDir).filter(f => /^chapters-.*\.js$/.test(f)).sort();
const chapters = (await Promise.all(files.map(f => import(pathToFileURL(path.join(dataDir, f)).href))))
  .flatMap(m => m.default)
  .sort((a, b) => a.subject.localeCompare(b.subject) || a.num - b.num);
const db = openDb();
const J = v => JSON.stringify(v);

const seed = db.transaction(() => {
  for (const t of ['tutorial_questions', 'tutorials', 'theme_clusters', 'chapter_skills', 'quiz_questions', 'flashcards', 'code_examples', 'cases', 'chapter_links', 'chapters', 'subjects', 'skills', 'skill_groups']) {
    db.prepare(`DELETE FROM ${t}`).run();
  }

  const insSubject = db.prepare('INSERT INTO subjects (id, code, title, short, description, status, themes, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  subjects.forEach((x, i) => insSubject.run(x.id, x.code, x.title, x.short, x.description, x.status, J(x.themes), i));

  const insGroup = db.prepare('INSERT INTO skill_groups (id, label, position) VALUES (?, ?, ?)');
  skillGroups.forEach((g, i) => insGroup.run(g.id, g.label, i));

  const insSkill = db.prepare(`INSERT INTO skills (id, group_id, title, icon, level, what, learn, tools, real_company, real_text, code_lang, code_source, mindmap, position)
    VALUES (@id, @group, @title, @icon, @level, @what, @learn, @tools, @realCo, @realText, @codeLang, @codeSrc, @map, @position)`);
  skills.forEach((s, i) => insSkill.run({
    id: s.id, group: s.group, title: s.title, icon: s.icon, level: s.level, what: s.what,
    learn: J(s.learn), tools: J(s.tools), realCo: s.real.co, realText: s.real.text,
    codeLang: s.code?.lang ?? null, codeSrc: s.code?.src ?? null, map: J(s.map), position: i
  }));

  const insCh = db.prepare(`INSERT INTO chapters (id, subject_id, num, theme, title, short, lecture, summary, tool, sections, mindmaps)
    VALUES (@id, @subject, @num, @theme, @title, @short, @lecture, @summary, @tool, @sections, @mindmaps)`);
  const insLink = db.prepare('INSERT INTO chapter_links (from_id, to_id, topic, text, position) VALUES (?, ?, ?, ?, ?)');
  const insCase = db.prepare('INSERT INTO cases (chapter_id, company, logo, color, year, title, story, lesson, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  const insCode = db.prepare('INSERT INTO code_examples (chapter_id, title, lang, explain, source, position) VALUES (?, ?, ?, ?, ?, ?)');
  const insCard = db.prepare('INSERT INTO flashcards (chapter_id, question, answer, position) VALUES (?, ?, ?, ?)');
  const insQuiz = db.prepare('INSERT INTO quiz_questions (chapter_id, question, options, answer_index, explanation, position) VALUES (?, ?, ?, ?, ?, ?)');
  const insTut = db.prepare('INSERT INTO tutorials (chapter_id, number, title, source, intro) VALUES (?, ?, ?, ?, ?)');
  const insTutQ = db.prepare('INSERT INTO tutorial_questions (chapter_id, label, kind, question, marks, answer, position) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const insChSkill = db.prepare('INSERT INTO chapter_skills (chapter_id, skill_id, why, position) VALUES (?, ?, ?, ?)');

  for (const c of chapters) {
    insCh.run({ id: c.id, subject: c.subject, num: c.num, theme: c.theme, title: c.title, short: c.short, lecture: c.lecture, summary: c.summary, tool: c.tool ?? null, sections: J(c.sections), mindmaps: J(c.mindmaps) });
  }
  const insCluster = db.prepare('INSERT INTO theme_clusters (subject_id, title, color, chapters, why, position) VALUES (?, ?, ?, ?, ?, ?)');
  clusters.forEach((k, i) => insCluster.run(k.subject, k.t, k.c, J(k.chs), k.why, i));

  for (const c of chapters) {   // after all chapters exist (foreign keys)
    c.links.forEach((l, i) => insLink.run(c.id, l.to, l.topic, l.text, i));
    c.cases.forEach((k, i) => insCase.run(c.id, k.co, k.logo, k.color, k.year, k.title, k.story, k.lesson, i));
    c.code.forEach((k, i) => insCode.run(c.id, k.title, k.lang, k.explain, k.src, i));
    c.cards.forEach(([q, a], i) => insCard.run(c.id, q, a, i));
    c.quiz.forEach((q, i) => insQuiz.run(c.id, q.q, J(q.o), q.a, q.why, i));
    c.beyond.forEach((b, i) => insChSkill.run(c.id, b.skill, b.why, i));
    if (c.tutorial) {
      const t = c.tutorial;
      insTut.run(c.id, t.no, t.title || `Tutorial ${t.no}`, t.source || '', t.intro || '');
      t.items.forEach((x, i) => insTutQ.run(c.id, x.n, x.kind || 'question', x.q, x.m ?? null, x.a, i));
    }
  }
});

seed();
const count = t => db.prepare(`SELECT COUNT(*) FROM ${t}`).pluck().get();
console.log('Seeded:', ['subjects', 'chapters', 'chapter_links', 'cases', 'code_examples', 'flashcards', 'quiz_questions', 'skills', 'chapter_skills', 'theme_clusters', 'tutorials', 'tutorial_questions'].map(t => `${t}=${count(t)}`).join(', '));
db.close();
