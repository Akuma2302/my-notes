// Profile: name, overall progress ring, chapters in progress / finished, bookmarks, best scores.
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../components/Icon.jsx';
import Link from '../components/Link.jsx';
import Art from '../components/Art.jsx';
import ProgressRing from '../components/ProgressRing.jsx';
import { useContent } from '../hooks/useContent.js';
import { chapterProgress, resetProgress, selectProgress, setName } from '../redux/progressSlice.js';
import { CHAPTER_TABS } from '../utils/constants.js';
import { useChapterTheme } from '../hooks/useSubject.js';
import { initials } from '../utils/maps.js';
import { booksIllustration } from '../utils/illustrations.js';

function ChapterLine({ c, done, total, best }) {
  const th = useChapterTheme()(c);
  const { subjectById } = useContent();
  return (
    <Link to={`/c/${c.id}`} className="row">
      <span className={'num ' + th.cls}>{c.num}</span>
      <span className="grow"><b>{c.title}</b>
        <small>{subjectById[c.subject]?.short} · {done}/{total} parts opened{best != null ? ` · best quiz ${best}/${c.quiz.length}` : ''}</small>
        <span className="prog"><i style={{ width: (done / total) * 100 + '%' }} /></span>
      </span>
      <span className="playdot"><Icon name="chev" /></span>
    </Link>
  );
}

export default function Me() {
  const { chapters, chapterById, skillById, subjects } = useContent();
  const { name, visited, saved, best } = useSelector(selectProgress);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const total = c => CHAPTER_TABS.length + (c.tool ? 1 : 0);
  const rows = chapters.map(c => ({ c, done: chapterProgress(visited, c, total(c)), total: total(c), best: best['q-' + c.id] }));
  const inProgress = rows.filter(r => r.done > 0 && r.done < r.total);
  const finished = rows.filter(r => r.done >= r.total);
  const overall = rows.reduce((s, r) => s + r.done, 0) / rows.reduce((s, r) => s + r.total, 0);

  return (
    <>
      <header className="profile-head">
        <span className="avatar lg" style={{ margin: '0 auto' }}>{initials(name)}</span>
        {editing
          ? <input autoFocus defaultValue={name} maxLength={30} aria-label="Your name" onBlur={e => { dispatch(setName(e.target.value)); setEditing(false); }} onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()} />
          : <h1>{name || 'Student'} <button onClick={() => setEditing(true)} aria-label="Edit name" style={{ verticalAlign: 'middle' }}><Icon name="edit" /></button></h1>}
        <small>Becoming a Software Engineering Master</small><br />
        <span className="pill">{subjects.length} subjects · {chapters.length} chapters · {finished.length} finished</span>
      </header>

      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 18 }}>
        <ProgressRing value={overall} max={1} size={96} stroke={8} big />
        <div><b style={{ fontSize: 17 }}>Overall progress</b><p style={{ color: 'var(--muted)', fontSize: 13.5 }}>Open every tab in a chapter (note, map, links, cases, code, beyond, cards, quiz) to finish it.</p></div>
      </div>

      <div className="lbl">In progress</div>
      {inProgress.length ? inProgress.map(r => <ChapterLine key={r.c.id} {...r} />) : <p style={{ color: 'var(--muted)' }}>Nothing in progress. Open a chapter from Home.</p>}

      <div className="lbl">Finished</div>
      {finished.length ? finished.map(r => <ChapterLine key={r.c.id} {...r} />) : <p style={{ color: 'var(--muted)' }}>No finished chapters yet.</p>}

      <div className="lbl">Saved</div>
      {saved.length === 0 && <div className="empty"><Art svg={booksIllustration()} /><p>Tap the bookmark on any chapter or SE topic to keep it here.</p></div>}
      {saved.map(k => {
        const [type, id] = k.split(':');
        const c = chapterById[id], s = skillById[id];
        if (type === 'c' && c) return <ChapterLine key={k} c={c} done={chapterProgress(visited, c, total(c))} total={total(c)} best={best['q-' + c.id]} />;
        if (type === 's' && s) return <Link key={k} to={`/skill/${id}`} className="row"><span className="num th-skill"><Icon name={s.icon} /></span><span className="grow"><b>{s.title}</b><small>SE essentials</small></span><span className="playdot"><Icon name="chev" /></span></Link>;
        return null;
      })}

      <div className="btns" style={{ marginTop: 24 }}>
        <button className="btn" onClick={() => { if (window.confirm('Clear your progress, bookmarks and scores on this device?')) dispatch(resetProgress()); }}>Reset progress</button>
      </div>
    </>
  );
}
