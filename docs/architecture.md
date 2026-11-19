# Architecture

```
            ┌──────────────────────── frontend (React + Vite) ────────────────────────┐
 Phone /    │ pages/ ── features/ ── components/                                       │
 browser ──►│    │            hooks/ useContent ◄── context/ContentContext               │
            │    └─ redux/ progress (read, saved, best scores) ── localStorage          │
            │ services/contentService ──► api.js ──► fetch /api/...                    │
            └────────────────────────────────────────────┬────────────────────────────┘
                                                         │ HTTP (JSON)
            ┌──────────────────────── backend (Express) ─▼────────────────────────────┐
            │ routes/ ─► middlewares/validate ─► controllers/ ─► services/             │
            │                                                     └─► repositories/ ─┐ │
            │ middlewares/errorHandler ◄── any thrown ApiError         models/ ◄─────┘ │
            └────────────────────────────────────────────────────────────┬─────────────┘
                                                                         │ SQL
            ┌──────────────────────── database (SQLite) ─────────────────▼─────────────┐
            │ sqa_study.db  ◄── migrations/*.sql (structure)  ◄── seeds/ (notes)        │
            └───────────────────────────────────────────────────────────────────────────┘
```

## Request flow example: open chapter 6

1. The app starts and `ContentContext` calls `getContent()` → `GET /api/content`.
2. `routes/index.js` → `content.controller.bundle` → `content.service.bundle()`.
3. The service asks `chapter.repository` and `skill.repository` for rows.
4. `models/chapter.model.js` turns rows (with JSON columns) into chapter objects.
5. The API responds with `{ data: { chapters, skills, skillGroups, clusters } }`.
6. The app keeps a copy in localStorage, so it still opens if the server is off later.
7. `#/c/ch6` → `App.jsx` picks `pages/Chapter.jsx`, which reads chapter 6 from context.

## Subjects

Home shows one tab per subject (plus SE essentials). The chosen subject is kept in Redux (`progress.subject`), and
Mind maps, Connect, Cards, Quiz, Cases and Gallery all follow it. Coming-soon subjects show a placeholder; practice
pages fall back to the first subject that has notes. Routes: `#/subjects`, `#/s/:subjectId`, `#/c/:chapterId`.

## Two build modes

| | Web build (`npm run build`) | Phone build (`npm run build:phone`) |
|---|---|---|
| Notes come from | `GET /api/content` | Built into the file from `database/seeds/data` |
| Search | `GET /api/search` (SQL `LIKE`) | Runs on the phone (`utils/localSearch.js`) |
| Risk table | `/api/risks`, saved in SQLite | Saved on the phone (localStorage) |
| Output | `frontend/dist/` (needs hosting) | `frontend/dist-phone/sqa-study.html` (one file) |
| Offline | Service worker cache | Always |

The switch is `import.meta.env.VITE_STATIC` (set in `frontend/.env.static`). Vite removes the unused branch, so the
web build does not include the seed data, and the phone build makes no API calls.

## Where state lives

| State | Where |
|---|---|
| Lecture notes, cases, code, cards, quiz, SE topics | Database (web) or built-in (phone) |
| Chapters read, bookmarks, best scores, subject tab | Redux, saved to localStorage |
| Light/dark theme | `ThemeContext`, saved to localStorage |
| Risk table | Database (web) or localStorage (phone) |

## Validation and errors

- Each route uses `validate(validator, 'params' | 'query' | 'body')`. Validators return `{ value, errors }`.
- Bad input gives a 400 with `details: [{ field, message }]`. Unknown ids give a 404. Unknown routes give a 404.
- The frontend also validates forms (risk table, calculators) and shows the message next to the form.
