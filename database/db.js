// Opens the SQLite database. better-sqlite3 is installed in backend/node_modules,
// so we load it from there; the database scripts have no packages of their own.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(here, '../backend/package.json'));
const Database = require('better-sqlite3');

export const DEFAULT_DB_PATH = path.join(here, 'sqa_study.db');

export function openDb(file = process.env.DB_PATH || DEFAULT_DB_PATH) {
  const db = new Database(path.resolve(file));
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}
