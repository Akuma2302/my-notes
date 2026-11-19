# Database (SQLite)

Your lecture notes are stored in a SQLite file, `sqa_study.db`, in this folder. The file is created by the scripts and is not committed to Git.

| File | Purpose |
|---|---|
| `schema.sql` | The full current schema in one place, for reading |
| `migrations/` | Numbered changes applied in order: `001_initial_schema`, `002_add_theme_clusters`, `003_add_subjects` |
| `seeds/data/` | The notes content: subjects, SQA chapters 1-5 and 6-10, SE topics, cross-lecture themes |
| `seeds/seed.js` | Loads `seeds/data` into the tables (clears content first; keeps your risks) |
| `migrate.js` | Applies new migrations; `--reset` deletes the database first |
| `db.js` | Opens the database using `better-sqlite3` from `../backend/node_modules` |

Run these from the backend folder:

```powershell
npm run db:migrate
```

```powershell
npm run db:seed
```

```powershell
npm run db:reset
```

## Tables

| Table | Holds |
|---|---|
| `subjects` | One row per subject (tab). `status` is `active` or `coming_soon`; `themes` names its chapter themes |
| `chapters` | One row per lecture, linked to a subject; number unique inside its subject; sections and mind maps as JSON |
| `chapter_links` | Topics shared between two lectures ("Ch 1 ↔ Ch 5: Fault vs failure") |
| `cases` | Real-life company examples |
| `code_examples` | Code for each chapter |
| `flashcards`, `quiz_questions` | Practice |
| `skill_groups`, `skills` | SE essentials topics |
| `chapter_skills` | Which SE topic sits under which chapter, and why |
| `theme_clusters` | Big themes across lectures of one subject |
| `risks` | Your own risk table (Ch 10 calculator) |
| `schema_migrations` | Which migrations have run |

## Adding a change

1. Add a new file, e.g. `migrations/003_add_notes_table.sql`.
2. Update `schema.sql` to match.
3. Run `npm run db:migrate`. Only new files are applied. Foreign keys are switched off while a migration runs (so tables can be rebuilt) and checked before it is saved.

Migration 003 is an example of a table rebuild: it moved chapter numbers from "unique in the whole app" to "unique per subject".
