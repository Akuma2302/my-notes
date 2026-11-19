# Editing the notes

All study content is in `database/seeds/data/`:

| File | Contains |
|---|---|
| `chapters-1-5.js`, `chapters-6-10.js` | Chapters: sections, pictures, links, mind maps, cases, code, cards, quiz, beyond |
| `skills.js` | SE essentials topics and their groups |
| `clusters.js` | Big themes across lectures |

After editing, reload the database and rebuild the phone file:

```powershell
npm run db:seed --prefix backend
```

```powershell
npm run build:phone --prefix frontend
```

## Fields in a chapter

- `sections[].body` is HTML (`<p>`, `<ul>`, `<b>`…). `sections[].pics` lists picture names from `frontend/src/utils/diagrams.js` (`D.special`).
- `links[]`: `{ to: 'ch5', topic, text }`. This creates the "Linked" boxes and the Connect graph.
- `beyond[]`: `{ skill: 'git', why }`. `skill` must be an id in `skills.js`.
- `quiz[].a` is the index of the right answer in `o`.
- `subject` is the subject id (`sqa`). `theme` is one of that subject's theme keys (for SQA: `quality`, `reliability`, `control`), which sets the chapter card style.

## Add a picture

Add a function to `D.special` in `frontend/src/utils/diagrams.js` (use the helpers `flow`, `cycle`, `tree`, `compare`,
`cards`, `bars`), then add its name to a section's `pics`.

## Add notes for a new subject

The three upcoming subjects already exist in `database/seeds/data/subjects.js` with `status: 'coming_soon'`
(`dcs` Database and Cloud Security, `ob` Organisational Behaviour, `plt` Programming Language Translation).
To fill one in, for example Database and Cloud Security:

1. In `subjects.js`, set `status: 'active'`, add the course `code`, and name its themes, e.g.
   `themes: { data: 'Data security', cloud: 'Cloud', ops: 'Operations' }` (the first three get the three card styles).
2. Create `database/seeds/data/chapters-dcs.js` in the same format as the SQA files, with
   `subject: 'dcs'` and ids `dcs1`, `dcs2`, … (numbers start at 1 again, since they're unique per subject).
3. Import it in `database/seeds/seed.js` and in `frontend/src/services/staticContent.js`, next to the SQA chapter files.
4. Optional: add that subject's big themes to `clusters.js` with `subject: 'dcs'`.
5. Run `npm run db:seed --prefix backend`, then `npm run build:phone --prefix frontend`.

The subject's tab stops saying "soon", and all its chapters get the same tabs: note, mind map, links, real life,
code, beyond lecture, cards and quiz. No code changes are needed.
