-- 002: big themes that run across several lectures (Connect page).
CREATE TABLE theme_clusters (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  color       TEXT NOT NULL,               -- diagram colour key: p, t, c, r, g, a
  chapters    TEXT NOT NULL,               -- JSON array of chapter numbers
  why         TEXT NOT NULL,
  position    INTEGER NOT NULL
);
