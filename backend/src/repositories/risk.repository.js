import { db } from '../config/database.js';

const q = {
  all: db.prepare('SELECT * FROM risks ORDER BY id'),
  byId: db.prepare('SELECT * FROM risks WHERE id = ?'),
  insert: db.prepare('INSERT INTO risks (name, probability, impact, plan) VALUES (@name, @probability, @impact, @plan)'),
  remove: db.prepare('DELETE FROM risks WHERE id = ?')
};

export const riskRepository = {
  findAll: () => q.all.all(),
  findById: id => q.byId.get(id),
  create: risk => q.byId.get(q.insert.run(risk).lastInsertRowid),
  remove: id => q.remove.run(id).changes > 0
};
