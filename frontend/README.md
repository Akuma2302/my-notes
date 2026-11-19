# Frontend (React + Vite)

The study app UI. Mobile-first, light and dark mode, works offline.

## Design

Monochrome black, white and soft lavender, with big bold headings, large rounded cards and pill buttons.
Illustrations are line art drawn in code (`src/utils/illustrations.js`) and switch with dark mode, where the
black cards turn light. Screens: a welcome screen on first open, Home ("Become the Software Engineering Master", subject tabs, theme chips,
chapter course cards with progress rings), Subjects and one page per subject, chapter hero (illustration, linked lectures, stats grid),
and Me (profile, in progress / finished, saved).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on http://localhost:5173 (calls the backend through `/api`) |
| `npm run build` | Web build in `dist/` (uses the backend API, caches for offline) |
| `npm run build:phone` | One offline file `dist-phone/sqa-study.html` with the notes built in |
| `npm run lint` | ESLint |

The API address is `VITE_API_URL` in `.env` (default `/api`; Vite proxies it to `localhost:5000` in development).

## Folder structure

| Folder | Purpose |
|---|---|
| `public/` | Static files copied as-is: icon, web manifest, service worker |
| `src/assets/` | Logo and icon paths |
| `src/components/` | Reusable UI: `Diagram`, `MindMap`, `CodeBlock`, `CaseCard`, `LinkBox`, `SkillCard`, `Tabs`, `TopBar`… |
| `src/layout/` | `AppLayout` and the bottom navigation bar |
| `src/pages/` | One file per screen: Home, Chapter, Connect, BigMap, Gallery, Practice, Search, Skill… |
| `src/features/` | Bigger self-contained pieces: chapter tabs, flashcards, quiz, calculators |
| `src/hooks/` | `useContent`, `useSubject` (chosen subject + its chapters), `useHashRoute`, `useRisks`, `useDebounce`, `useTheme` |
| `src/context/` | `ContentContext` (loads all notes once), `ThemeContext` |
| `src/redux/` | Store + `progressSlice`: welcome done, name, tabs opened per chapter, bookmarks, best quiz scores (saved on the device) |
| `src/services/` | `api.js` fetch wrapper; `contentService.js` picks API or built-in data |
| `src/utils/` | SVG diagram drawing, code highlighter, storage, constants, search |
| `App.jsx` | Chooses the page for the current `#/route` |
| `main.jsx` | Mounts React with Redux, theme and content providers |
| `index.css` | All styles |

## How data is loaded

- **Web build:** `GET /api/content` once at start (copy kept on the device in case the server is off later). Search uses `/api/search`; the risk table uses `/api/risks` (saved in the database).
- **Phone build:** Vite mode `static` imports `../database/seeds/data` directly, so no server is needed. Search runs on the phone, and risks are saved on the phone.

Routing uses the URL hash (`#/c/ch3/map`), so it works from a file, GitHub Pages, or any server.
