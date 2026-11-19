// Graph of all chapters and the topics they share, plus big cross-lecture themes.
import { useMemo } from 'react';
import TopBar from '../components/TopBar.jsx';
import Link from '../components/Link.jsx';
import Diagram from '../components/Diagram.jsx';
import D from '../utils/diagrams.js';
import { useContent } from '../hooks/useContent.js';
import { replaceRoute } from '../hooks/useHashRoute.js';
import SubjectTabs from '../components/SubjectTabs.jsx';
import { useSubject } from '../hooks/useSubject.js';

export default function Connect({ selected }) {
  const { chapterById, clusters: allClusters } = useContent();
  const { subject, chapters, theme } = useSubject();
  const clusters = allClusters.filter(k => (k.subject || 'sqa') === subject.id);
  const edges = useMemo(() => {
    const map = new Map();
    chapters.forEach(c => c.links.forEach(l => {
      if (chapterById[l.to].subject !== c.subject) return;   // only links inside this subject
      const [a, b] = [c.num, chapterById[l.to].num].sort((x, y) => x - y);
      const k = `${a}-${b}`;
      if (!map.has(k)) map.set(k, { a, b, topics: new Set() });
      map.get(k).topics.add(l.topic);
    }));
    return [...map.values()];
  }, [chapters, chapterById]);

  const cx = 190, cy = 190, R = 150;
  if (!chapters.length) return <><TopBar title="Topic connections" sub={subject.short} back={false} /><SubjectTabs activeOnly /><p className="empty">No chapters in this subject yet.</p></>;
  const pos = Object.fromEntries(chapters.map((c, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / chapters.length; return [c.num, [cx + R * Math.cos(a), cy + R * Math.sin(a)]]; }));

  const onClick = e => { const g = e.target.closest('[data-sel]'); if (g) replaceRoute('/connect?sel=' + g.dataset.sel); };
  let body = '';
  edges.forEach(({ a, b }) => {
    const on = selected && (a === selected || b === selected);
    body += `<line x1="${pos[a][0]}" y1="${pos[a][1]}" x2="${pos[b][0]}" y2="${pos[b][1]}" stroke="${on ? 'var(--accent)' : 'var(--muted)'}" stroke-width="${on ? 2.6 : 1}" opacity="${selected && !on ? 0.2 : 0.75}"/>`;
  });
  chapters.forEach(c => {
    const [x, y] = pos[c.num], s = selected === c.num;
    body += `<g class="n-${theme(c.theme).c}" data-sel="${c.num}" style="cursor:pointer" role="button" aria-label="Chapter ${c.num}"><circle cx="${x}" cy="${y}" r="${s ? 28 : 23}" stroke-width="${s ? 2.5 : 1.2}"/><text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="700">${c.num}</text></g>`;
  });
  const sel = chapters.find(c => c.num === selected);

  return (
    <>
      <TopBar title="Topic connections" sub={`Which lectures share ideas · ${subject.short}`} back={false} />
      <SubjectTabs activeOnly />
      {chapters.length === 0 && <p className="empty">No chapters in this subject yet.</p>}
      <div onClick={onClick}><Diagram svg={D.svg(380, 380, body, 'Tap a chapter number to highlight its links')} /></div>
      {sel && <>
        <h2>Ch {sel.num}: {sel.title}</h2>
        {edges.filter(e => e.a === sel.num || e.b === sel.num).map(e => {
          const other = chapters.find(c => c.num === (e.a === sel.num ? e.b : e.a));
          return <div className="linkbox" key={e.a + '-' + e.b}><b>Ch {sel.num} ↔ Ch {other.num}</b>: {[...e.topics].join(', ')}<br /><Link to={`/c/${other.id}/links`}>Open Ch {other.num}: {other.short}</Link></div>;
        })}
      </>}
      {clusters.length > 0 && <h2>Big themes across lectures</h2>}
      {clusters.length > 0 && <Diagram svg={D.cards(clusters.map(k => ({ t: k.t, s: k.chs.map(n => 'Ch ' + n).join(' · '), c: k.c })), { cols: 2, h: 60, title: 'Big themes' })} />}
      {clusters.map(k => (
        <div className="card" key={k.t}>
          <b>{k.t}</b>{' '}
          {k.chs.map(n => { const c = chapters.find(x => x.num === n); return c && <Link key={n} to={`/c/${c.id}`} className={'chip ' + theme(c.theme).cls}>Ch {n}</Link>; })}
          <p style={{ fontSize: 14 }}>{k.why}</p>
        </div>
      ))}
    </>
  );
}
