# Project documentation

| Document | What it covers |
|---|---|
| [architecture.md](architecture.md) | How frontend, backend and database work together; the two build modes |
| [api.md](api.md) | Every REST endpoint with examples and error formats |
| [content-guide.md](content-guide.md) | How to edit notes, add a chapter, or add a new subject |

## Summary

- **Frontend**: React 18 + Vite 6, Redux Toolkit for progress, hash routing, SVG diagrams drawn in code.
- **Backend**: Node.js + Express 4, layered as routes → controllers → services → repositories.
- **Database**: SQLite through `better-sqlite3`, with versioned migrations and seed scripts.
- **Phone build**: one self-contained HTML file with the notes built in, works with no server.
