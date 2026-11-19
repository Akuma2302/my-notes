-- 003: many subjects. Each chapter now belongs to a subject, and chapter numbers
-- only need to be unique inside their subject (every subject has a "Chapter 1").
-- SQLite cannot change a UNIQUE rule in place, so chapters is rebuilt
-- (create new table, copy rows, drop old, rename). migrate.js turns foreign
-- keys off while this runs and checks them afterwards.

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

INSERT INTO subjects (id, code, title, short, status, position)
VALUES ('sqa', 'CSE6314', 'Software Reliability and Quality Assurance', 'Software QA', 'active', 0);

CREATE TABLE chapters_new (
  id          TEXT PRIMARY KEY,
  subject_id  TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  num         INTEGER NOT NULL,
  theme       TEXT NOT NULL,                -- free text now: each subject has its own themes
  title       TEXT NOT NULL,
  short       TEXT NOT NULL,
  lecture     TEXT NOT NULL,
  summary     TEXT NOT NULL,
  tool        TEXT,
  sections    TEXT NOT NULL,
  mindmaps    TEXT NOT NULL,
  UNIQUE (subject_id, num)
);

INSERT INTO chapters_new (id, subject_id, num, theme, title, short, lecture, summary, tool, sections, mindmaps)
SELECT id, 'sqa', num, theme, title, short, lecture, summary, tool, sections, mindmaps FROM chapters;

DROP TABLE chapters;
ALTER TABLE chapters_new RENAME TO chapters;
CREATE INDEX idx_chapters_subject ON chapters(subject_id, num);

-- Cross-lecture themes belong to a subject too.
ALTER TABLE theme_clusters ADD COLUMN subject_id TEXT NOT NULL DEFAULT 'sqa' REFERENCES subjects(id) ON DELETE CASCADE;
