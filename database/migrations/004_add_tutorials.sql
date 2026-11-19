-- 004: tutorials. Each chapter can have one tutorial sheet (title, source file,
-- intro) with numbered questions, marks and a model answer written from the lecture.

CREATE TABLE tutorials (
  chapter_id  TEXT PRIMARY KEY REFERENCES chapters(id) ON DELETE CASCADE,
  number      INTEGER NOT NULL,               -- "Tutorial 3"
  title       TEXT NOT NULL,
  source      TEXT NOT NULL DEFAULT '',       -- original file name, e.g. TUTORIAL-(3)-(TTXL-GX).docx
  intro       TEXT NOT NULL DEFAULT ''        -- HTML shown above the questions
);

CREATE TABLE tutorial_questions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  chapter_id  TEXT NOT NULL REFERENCES tutorials(chapter_id) ON DELETE CASCADE,
  label       TEXT NOT NULL,                  -- "Q1(a)"
  kind        TEXT NOT NULL DEFAULT 'question' CHECK (kind IN ('question', 'practical', 'assignment')),
  question    TEXT NOT NULL,
  marks       INTEGER,                        -- NULL when the sheet gives no marks
  answer      TEXT NOT NULL,                  -- HTML model answer
  position    INTEGER NOT NULL
);

CREATE INDEX idx_tutq_chapter ON tutorial_questions(chapter_id, position);
