// Applies every migrations/*.sql file that has not run yet, in name order.
// Usage: node database/migrate.js          (apply new migrations)
//        node database/migrate.js --reset  (delete the database file first)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDb, DEFAULT_DB_PATH } from './db.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const dbFile = path.resolve(process.env.DB_PATH || DEFAULT_DB_PATH);

if (process.argv.includes('--reset')) {
  for (const f of [dbFile, dbFile + '-wal', dbFile + '-shm']) fs.rmSync(f, { force: true });
  console.log('Reset: removed', path.basename(dbFile));
}

const db = openDb(dbFile);
db.exec('CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT (datetime(\'now\')))');
const done = new Set(db.prepare('SELECT name FROM schema_migrations').pluck().all());

const files = fs.readdirSync(path.join(here, 'migrations')).filter(f => f.endsWith('.sql')).sort();
let applied = 0;
for (const file of files) {
  if (done.has(file)) continue;
  const sql = fs.readFileSync(path.join(here, 'migrations', file), 'utf8');
  // Foreign keys off while a migration runs (needed to rebuild tables), then verified.
  db.pragma('foreign_keys = OFF');
  db.transaction(() => {
    db.exec(sql);
    const broken = db.pragma('foreign_key_check');
    if (broken.length) throw new Error(`${file} broke ${broken.length} foreign key(s): ${JSON.stringify(broken.slice(0, 3))}`);
    db.prepare('INSERT INTO schema_migrations (name) VALUES (?)').run(file);
  })();
  db.pragma('foreign_keys = ON');
  console.log('Applied', file);
  applied++;
}
console.log(applied ? `${applied} migration(s) applied.` : 'Database is up to date.');
db.close();
