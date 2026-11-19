# API reference

Base URL: `http://localhost:5000/api`

Success: `{ "data": ... }`, sometimes with `"meta": { ... }`.
Error: `{ "error": { "message": "...", "details": [{ "field": "...", "message": "..." }] } }`.

## Content

| Method | Path | Description |
|---|---|---|
| GET | `/health` | `{ status: "ok", time }` |
| GET | `/content` | Everything the app needs: `{ subjects, chapters (full), skills, skillGroups, clusters }` |
| GET | `/subjects` | All subjects with `status` (`active` / `coming_soon`), `themes`, `chapterCount` |
| GET | `/subjects/:id` | One subject with its chapter summaries. 404 if missing |
| GET | `/chapters` | Chapter summaries. `?full=true` returns full chapters; `?subject=sqa` filters |
| GET | `/chapters/:id` | One full chapter (`ch1`, later e.g. `dcs1`). 400 for a badly formed id, 404 if missing |
| GET | `/connections` | `{ edges: [{ subject, a, b, topics[] }], clusters[] }` for the Connect page |
| GET | `/skills` | `{ skills[], groups[] }` |
| GET | `/skills/:id` | One SE topic plus `usedIn` (the chapters that link to it, and why) |

A full chapter looks like this:

```json
{
  "id": "ch6", "subject": "sqa", "num": 6, "theme": "reliability", "title": "Programming reliability",
  "lecture": "Chapter 6 - Programming Realiability", "summary": "...",
  "sections": [{ "h": "Fault tolerance", "body": "<p>...</p>", "pics": ["ftSteps"] }],
  "mindmaps": [{ "center": "...", "branches": [{ "label": "...", "color": "t", "kids": ["..."] }] }],
  "links":  [{ "to": "ch5", "topic": "Reliability", "text": "..." }],
  "cases":  [{ "co": "Airbus A320", "year": "1988→", "title": "...", "story": "...", "lesson": "..." }],
  "code":   [{ "title": "...", "lang": "Python", "explain": "...", "src": "..." }],
  "cards":  [["question", "answer"]],
  "quiz":   [{ "q": "...", "o": ["a", "b", "c", "d"], "a": 1, "why": "..." }],
  "beyond": [{ "skill": "oop", "why": "..." }]
}
```

## Practice

| Method | Path | Description |
|---|---|---|
| GET | `/practice/flashcards?chapter=ch3` | Flashcards. Filter by `chapter` and/or `subject`; all if both are left out |
| GET | `/practice/quiz?subject=sqa` | Quiz questions with answer index and explanation (same filters) |
| GET | `/practice/cases` | Every company case with its chapter |

## Search

| Method | Path | Description |
|---|---|---|
| GET | `/search?q=fault` | Notes, cases, cards, code and SE topics. `q` must be 2–100 characters. `meta.total` is the full count; up to 60 results are returned |

Each result: `{ type, title, label, go, snippet?, chapterId? }`. `go` is the app route to open.

## Risks (Ch 10 risk table)

| Method | Path | Body | Description |
|---|---|---|---|
| GET | `/risks` | | All risks, highest exposure first |
| POST | `/risks` | `{ name, probability (1-100), impact (1-5), plan? }` | 201 with the new risk |
| DELETE | `/risks/:id` | | 204, or 404 if it does not exist |

`exposure = probability / 100 × impact`.

```powershell
curl.exe -X POST http://localhost:5000/api/risks -H "Content-Type: application/json" -d '{\"name\":\"Scope creep\",\"probability\":60,\"impact\":4}'
```
