// One shared SQLite connection for the whole app.
import fs from 'node:fs';
import Database from 'better-sqlite3';
import { config } from './index.js';

if (!fs.existsSync(config.dbPath)) {
  throw new Error(`Database not found at ${config.dbPath}. Run: npm run db:reset`);
}

export const db = new Database(config.dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
