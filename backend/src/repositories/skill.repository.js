import { db } from '../config/database.js';

const q = {
  all: db.prepare('SELECT * FROM skills ORDER BY position'),
  byId: db.prepare('SELECT * FROM skills WHERE id = ?'),
  groups: db.prepare('SELECT * FROM skill_groups ORDER BY position'),
  usedIn: db.prepare(`SELECT cs.why, c.id, c.num, c.title FROM chapter_skills cs
                      JOIN chapters c ON c.id = cs.chapter_id WHERE cs.skill_id = ? ORDER BY c.num`)
};

export const skillRepository = {
  findAll: () => q.all.all(),
  findById: id => q.byId.get(id),
  findGroups: () => q.groups.all(),
  findChaptersUsing: id => q.usedIn.all(id)
};
