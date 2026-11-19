import { useEffect, useState } from 'react';
import TopBar from '../components/TopBar.jsx';
import Link from '../components/Link.jsx';
import { useContent } from '../hooks/useContent.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { search } from '../services/contentService.js';

export default function Search({ initial = '' }) {
  const content = useContent();
  const [q, setQ] = useState(initial);
  const [res, setRes] = useState(null);
  const query = useDebounce(q.trim());

  useEffect(() => {
    history.replaceState(null, '', '#/search' + (query ? '?q=' + encodeURIComponent(query) : ''));
    if (query.length < 2) { setRes(null); return; }
    let live = true;
    search(query, content).then(r => live && setRes(r));
    return () => { live = false; };
  }, [query, content]);

  return (
    <>
      <TopBar title="Search" sub="Notes, cases, cards, SE topics" />
      <input className="search" autoFocus placeholder="fault tolerance, McCall, PDCA…" value={q} onChange={e => setQ(e.target.value)} aria-label="Search" />
      {q.trim().length === 1 && <p className="err">Type at least 2 letters.</p>}
      {res && <p style={{ color: 'var(--muted)', fontSize: 13 }}>{res.total} results</p>}
      {res?.results.map((r, i) => (
        <Link key={i} to={r.go} className="row">
          <span className="grow"><b>{r.title}</b><small>{r.label}{r.snippet ? ` · …${r.snippet}…` : ''}</small></span>
        </Link>
      ))}
    </>
  );
}
