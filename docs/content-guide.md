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

## Add notes for a new subject or chapter

1. In `database/seeds/data/subjects.js`, add the subject (or set an existing one to `status: 'active'`), with its
   `code` and `themes`, e.g. `themes: { data: 'Data security', cloud: 'Cloud' }`.
2. Create a file `database/seeds/data/chapters-<something>.js` that `export default`s an array of chapters with
   `subject: '<id>'` and ids like `dcs2`. **Every `chapters-*.js` file is loaded automatically** by the seed script
   and the phone build, so nothing else needs editing.
3. Optional: add that subject's big themes to `clusters.js` with `subject: '<id>'`.
4. Run `npm run db:seed --prefix backend`, then `npm run build:phone --prefix frontend`.

## Tutorials

Add a `tutorial` object to a chapter:

```js
tutorial: { no: 3, source: 'TUTORIAL-(3).docx', intro: '<p>optional</p>', items: [
  { n: 'Q1(a)', m: 3, q: 'Question text', a: '<p>Model answer (HTML)</p>' },
  { n: 'P1', kind: 'practical', q: '...', a: '...' }          // kind: question | practical | assignment
] }
```

The chapter then gets a **Tutorial** tab, and its questions appear in search.

## Pictures in the data

Besides the named pictures in `D.special`, a section's `pics` can hold a picture written as data:
`{ flow: [...], dir: 'h' }`, `{ cycle: [...], center }`, `{ cards: [{ t, s, c }], cols }`,
`{ compare: { a: { title, items }, b: {...} } }`, `{ tree: { root, kids } }`, `{ bars: [{ label, v }] }`.
