import { db } from '../config/database.js';

const q = {
  all: db.prepare(`SELECT s.*, (SELECT COUNT(*) FROM chapters c WHERE c.subject_id = s.id) AS chapter_count
                   FROM subjects s ORDER BY s.position`),
  byId: db.prepare(`SELECT s.*, (SELECT COUNT(*) FROM chapters c WHERE c.subject_id = s.id) AS chapter_count
                    FROM subjects s WHERE s.id = ?`)
};

export const subjectRepository = {
  findAll: () => q.all.all(),
  findById: id => q.byId.get(id)
};
