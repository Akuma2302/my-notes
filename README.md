# Become the Software Engineering Master

A full-stack study app with one tab per subject, then chapters inside each subject.

| Subject | Status |
|---|---|
| Software Reliability and Quality Assurance (CSE6314) | 10 chapters from your lecture PDFs |
| Database and Cloud Security | Coming soon |
| Organisational Behaviour | Coming soon |
| Programming Language Translation | Coming soon |

The Software QA subject has 50 diagrams, 36 mind maps, 39 company cases, 41 code examples, 80 flashcards, 45 quiz questions,
links between lectures, and 19 "beyond the lecture" industry topics under every chapter.

## Folder structure

```
my-notes/
├── frontend/          React + Vite app (the UI you use on your phone)
├── backend/           Node.js + Express REST API
├── database/          SQLite schema, migrations and seed data (your notes live here)
├── docs/              Architecture, API reference, data model
├── .gitignore
└── README.md
```

| Part | What it does | Details |
|---|---|---|
| `frontend/` | Screens, mind maps, quiz, flashcards, calculators | [frontend/README.md](frontend/README.md) |
| `backend/` | API: routes → controllers → services → repositories → database | [backend/README.md](backend/README.md) |
| `database/` | `schema.sql`, `migrations/`, `seeds/` | [database/README.md](database/README.md) |
| `docs/` | How it all fits together, every API endpoint | [docs/README.md](docs/README.md) |

## Run it (Windows PowerShell)

You need Node.js 18 or newer.

1. Install packages (first time only)

```powershell
cd backend; npm install; cd ..\frontend; npm install; cd ..
```

2. Create the database and load your notes (first time, or after editing the seed data)

```powershell
npm run db:reset --prefix backend
```

3. Start the API (leave this terminal open)

```powershell
npm run dev --prefix backend
```

4. In a second terminal, start the app, then open http://localhost:5173

```powershell
npm run dev --prefix frontend
```

## Put it on your phone

Build the offline single-file version. It has the notes built in and needs no server:

```powershell
npm run build:phone --prefix frontend
```

Send `frontend/dist-phone/sqa-study.html` to your phone (WhatsApp to yourself, Google Drive, USB) and open it in Chrome.
Progress, bookmarks and your risk table are saved on the phone.

## Edit notes or add a subject

Notes are in `database/seeds/data/`. Edit them, then run `npm run db:seed --prefix backend` to reload the database,
and `npm run build:phone --prefix frontend` to refresh the phone file.

To fill in a coming-soon subject, follow [docs/content-guide.md](docs/content-guide.md#add-notes-for-a-new-subject).
