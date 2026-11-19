-- SQA Study App: full database schema (SQLite).
-- This file is the current schema in one place. Changes are applied through migrations/.

PRAGMA foreign_keys = ON;

-- Subjects (tabs on Home). 'coming_soon' subjects have no chapters yet.  (migration 003)
CREATE TABLE subjects (
  id          TEXT PRIMARY KEY,             -- 'sqa'
  code        TEXT NOT NULL DEFAULT '',     -- course code, e.g. 'CSE6314'
  title       TEXT NOT NULL,
  short       TEXT NOT NULL,                -- tab label
  description TEXT NOT NULL DEFAULT '',
  status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'coming_soon')),
  themes      TEXT NOT NULL DEFAULT '{}',   -- JSON {themeKey: label}, e.g. {"quality": "Quality ideas"}
  position    INTEGER NOT NULL
);

-- One row per lecture chapter. Long, nested display content (note sections and
-- mind maps) is stored as JSON because it is always read as a whole.
CREATE TABLE chapters (
  id          TEXT PRIMARY KEY,            -- 'ch1' (SQA), e.g. 'dcs1' for other subjects
  subject_id  TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  num         INTEGER NOT NULL,            -- chapter number inside its subject
  theme       TEXT NOT NULL,               -- e.g. 'quality', 'reliability', 'control'
  title       TEXT NOT NULL,
  short       TEXT NOT NULL,
  lecture     TEXT NOT NULL,               -- source PDF name
  summary     TEXT NOT NULL,
  tool        TEXT,                        -- 'reliability' | 'fp' | 'risk' | NULL
  sections    TEXT NOT NULL,               -- JSON [{h, body, pics[]}]
  mindmaps    TEXT NOT NULL,               -- JSON [{center, branches[]}]
  UNIQUE (subject_id, num)
);

-- Topics shared between two lectures ("Ch 1 <-> Ch 5: fault vs failure").
CREATE TABLE chapter_links (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  from_id     TEXT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  to_id       TEXT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  topic       TEXT NOT NULL,
  text        TEXT NOT NULL,
  position    INTEGER NOT NULL
);

CREATE TABLE cases (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  chapter_id  TEXT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  company     TEXT NOT NULL,
  logo        TEXT NOT NULL,
  color       TEXT NOT NULL,
  year        TEXT NOT NULL,
  title       TEXT NOT NULL,
  story       TEXT NOT NULL,
  lesson      TEXT NOT NULL,
  position    INTEGER NOT NULL
);

CREATE TABLE code_examples (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  chapter_id  TEXT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  lang        TEXT NOT NULL,
  explain     TEXT NOT NULL,
  source      TEXT NOT NULL,
  position    INTEGER NOT NULL
);

CREATE TABLE flashcards (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  chapter_id  TEXT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  position    INTEGER NOT NULL
);

CREATE TABLE quiz_questions (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  chapter_id   TEXT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  question     TEXT NOT NULL,
  options      TEXT NOT NULL,              -- JSON array of strings
  answer_index INTEGER NOT NULL,
  explanation  TEXT NOT NULL,
  position     INTEGER NOT NULL
);

-- "SE essentials": industry topics beyond the lecture.
CREATE TABLE skill_groups (
  id          TEXT PRIMARY KEY,            -- 'Core'
  label       TEXT NOT NULL,
  position    INTEGER NOT NULL
);

CREATE TABLE skills (
  id           TEXT PRIMARY KEY,           -- 'git'
  group_id     TEXT NOT NULL REFERENCES skill_groups(id),
  title        TEXT NOT NULL,
  icon         TEXT NOT NULL,
  level        TEXT NOT NULL,
  what         TEXT NOT NULL,
  learn        TEXT NOT NULL,              -- JSON array
  tools        TEXT NOT NULL,              -- JSON array
  real_company TEXT NOT NULL,
  real_text    TEXT NOT NULL,
  code_lang    TEXT,
  code_source  TEXT,
  mindmap      TEXT NOT NULL,              -- JSON {center, branches[]}
  position     INTEGER NOT NULL
);

-- Which SE topic belongs under which chapter, and why.
CREATE TABLE chapter_skills (
  chapter_id  TEXT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  skill_id    TEXT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  why         TEXT NOT NULL,
  position    INTEGER NOT NULL,
  PRIMARY KEY (chapter_id, skill_id)
);

-- Risk table the student fills in (Ch 10 calculator).
CREATE TABLE risks (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  probability INTEGER NOT NULL CHECK (probability BETWEEN 1 AND 100),
  impact      INTEGER NOT NULL CHECK (impact BETWEEN 1 AND 5),
  plan        TEXT NOT NULL DEFAULT '',
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Big themes across lectures (added in migration 002).
CREATE TABLE theme_clusters (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  color       TEXT NOT NULL,
  chapters    TEXT NOT NULL,               -- JSON array of chapter numbers
  why         TEXT NOT NULL,
  position    INTEGER NOT NULL,
  subject_id  TEXT NOT NULL DEFAULT 'sqa' REFERENCES subjects(id) ON DELETE CASCADE
);

CREATE INDEX idx_chapters_subject ON chapters(subject_id, num);
CREATE INDEX idx_links_from    ON chapter_links(from_id);
CREATE INDEX idx_links_to      ON chapter_links(to_id);
CREATE INDEX idx_cases_ch      ON cases(chapter_id);
CREATE INDEX idx_code_ch       ON code_examples(chapter_id);
CREATE INDEX idx_cards_ch      ON flashcards(chapter_id);
CREATE INDEX idx_quiz_ch       ON quiz_questions(chapter_id);
CREATE INDEX idx_chskills_sk   ON chapter_skills(skill_id);
