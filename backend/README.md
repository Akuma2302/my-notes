# Backend (Node.js + Express + SQLite)

REST API that serves the study notes from the SQLite database in `../database`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the API with auto-reload on http://localhost:5000/api |
| `npm start` | Start the API (no reload) |
| `npm run db:migrate` | Apply new files in `../database/migrations` |
| `npm run db:seed` | Reload the notes from `../database/seeds/data` (keeps your risks) |
| `npm run db:reset` | Delete the database, run all migrations, then seed |

Settings are in `.env` (copy from `.env.example`): `PORT`, `DB_PATH`, `CORS_ORIGIN`, `NODE_ENV`.

## Request flow

```
Client → routes/ → middlewares/ (validate) → controllers/ → services/ → repositories/ → SQLite
                                                                  ↑ models/ turn rows into objects
```

| Folder | Purpose |
|---|---|
| `src/config/` | Reads `.env`; opens the one shared database connection |
| `src/routes/` | URL → controller, with validation middleware per route |
| `src/controllers/` | Thin: read validated input, call a service, send JSON |
| `src/services/` | Business logic (e.g. connection graph, search ranking, risk exposure) |
| `src/repositories/` | All SQL lives here, as prepared statements |
| `src/models/` | Convert database rows into the shapes the app uses |
| `src/middlewares/` | Request logging, validation, 404, central error handler |
| `src/validators/` | Input rules for params, query strings and bodies |
| `src/utils/` | `ApiError`, `asyncHandler`, response helpers, text helpers |

Every response is `{ "data": ... }` (sometimes with `"meta"`). Every error is
`{ "error": { "message": "...", "details": [...] } }` with the right HTTP status.

See [../docs/api.md](../docs/api.md) for every endpoint.
