import { useDispatch, useSelector } from 'react-redux';
import TopBar from '../components/TopBar.jsx';
import Icon from '../components/Icon.jsx';
import Link from '../components/Link.jsx';
import MindMap from '../components/MindMap.jsx';
import CaseCard from '../components/CaseCard.jsx';
import CodeBlock from '../components/CodeBlock.jsx';
import NotFound from './NotFound.jsx';
import { skillMap } from '../utils/maps.js';
import { useContent } from '../hooks/useContent.js';
import { selectSaved, toggleSaved } from '../redux/progressSlice.js';

export default function Skill({ id }) {
  const { skillById, chapters } = useContent();
  const s = skillById[id];
  const saved = useSelector(selectSaved);
  const dispatch = useDispatch();
  if (!s) return <NotFound />;
  const key = 's:' + id;
  const uses = chapters.flatMap(c => c.beyond.filter(b => b.skill === id).map(b => ({ c, why: b.why })));
  return (
    <>
      <TopBar title={s.title} sub={`${s.group} · ${s.level}`}>
        <button className={'icon-btn' + (saved.includes(key) ? ' bm' : '')} onClick={() => dispatch(toggleSaved(key))} aria-label="Save topic" aria-pressed={saved.includes(key)}><Icon name="bookmark" /></button>
      </TopBar>
      <div className="card">{s.what}</div>
      <h2>Where it appears in your lectures</h2>
      {uses.length ? uses.map(u => (
        <div className="linkbox" key={u.c.id}><b>Ch {u.c.num}: {u.c.title}</b><br />{u.why}<br /><Link to={`/c/${u.c.id}/beyond`}>Open Ch {u.c.num}</Link></div>
      )) : <p>General skill for every subject.</p>}
      <MindMap map={skillMap(s)} caption={'Mind map: ' + s.title} />
      <h2>What to learn</h2>
      <ul>{s.learn.map(x => <li key={x}>{x}</li>)}</ul>
      <div className="pill-row">{s.tools.map(t => <span key={t} className="chip th-skill">{t}</span>)}</div>
      <h2>Real-life example</h2>
      <CaseCard item={{ co: s.real.co, logo: s.real.co.slice(0, 2).toUpperCase(), color: 'a', year: '', title: s.title + ' in industry', story: s.real.text, lesson: 'Connects to ' + (uses.map(u => 'Ch ' + u.c.num).join(', ') || 'your whole degree') }} />
      {s.code && <><h2>Code example</h2><CodeBlock src={s.code.src} lang={s.code.lang} /></>}
    </>
  );
}
