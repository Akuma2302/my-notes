// "My notes": every sticky note in one list, grouped by the page it sits on. Tap a note to jump
// straight to that page; the note pops out its preview there.
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import TopBar from '../components/TopBar.jsx';
import Icon from '../components/Icon.jsx';
import NoteIcon from '../features/notes/NoteIcon.jsx';
import { useContent } from '../hooks/useContent.js';
import { navigate } from '../hooks/useHashRoute.js';
import { describePage, focusNote } from '../features/notes/pageInfo.js';
import { hasPhotos } from '../features/notes/richtext.js';

const ago = t => {
  if (!t) return '';
  const m = Math.round((Date.now() - t) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m} min ago`;
  if (m < 1440) return `${Math.round(m / 60)} h ago`;
  return new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
};

function NoteRow({ note }) {
  const [first, ...rest] = (note.text || '').split('\n').map(s => s.trim()).filter(Boolean);
  const photo = hasPhotos(note.html);
  const links = (note.links || []).length;
  const go = () => { focusNote(note.id, note.page); navigate(note.page); };
  return (
    <button className={`nl-note note-${note.color}`} onClick={go}>
      <span className="nl-dot" aria-hidden="true"><NoteIcon name={photo && !first ? 'photo' : 'lines'} /></span>
      <span className="grow">
        <b>{first || (photo ? 'Photo note' : links ? 'Saved links' : 'Empty note')}</b>
        {rest.length > 0 && <small className="nl-snip">{rest.join(' · ')}</small>}
        <span className="nl-meta">
          {ago(note.updated || note.created)}
          {photo && <span><NoteIcon name="photo" />photo</span>}
          {links > 0 && <span><NoteIcon name="link" />{links}</span>}
        </span>
      </span>
      <span className="playdot"><Icon name="chev" /></span>
    </button>
  );
}

export default function Notes() {
  const notes = useSelector(s => s.notes);
  const content = useContent();
  const [q, setQ] = useState('');
  const [subject, setSubject] = useState('all');

  // newest first, then grouped by page (a page's place in the list = its newest note)
  const groups = useMemo(() => {
    const words = q.trim().toLowerCase();
    const map = new Map();
    [...notes]
      .sort((a, b) => (b.updated || b.created || 0) - (a.updated || a.created || 0))
      .forEach(n => {
        const info = describePage(n.page, content);
        if (subject !== 'all' && info.subject !== subject) return;
        if (words && !`${n.text} ${(n.links || []).join(' ')} ${info.title} ${info.sub}`.toLowerCase().includes(words)) return;
        if (!map.has(n.page)) map.set(n.page, { page: n.page, info, notes: [] });
        map.get(n.page).notes.push(n);
      });
    return [...map.values()];
  }, [notes, content, q, subject]);

  const subjectsWithNotes = useMemo(() => {
    const ids = new Set(notes.map(n => describePage(n.page, content).subject));
    return content.subjects.filter(s => ids.has(s.id));
  }, [notes, content]);

  const pages = new Set(notes.map(n => n.page)).size;
  const shown = groups.reduce((s, g) => s + g.notes.length, 0);

  return (
    <>
      <TopBar title="My notes" sub={notes.length ? `${notes.length} note${notes.length > 1 ? 's' : ''} on ${pages} page${pages > 1 ? 's' : ''}` : 'All your sticky notes in one place'} back={false} />

      {notes.length > 0 && (
        <>
          <input className="search" type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search your notes…" aria-label="Search your notes" />
          {subjectsWithNotes.length > 1 && (
            <div className="tabs" role="tablist" aria-label="Filter by subject">
              {[{ id: 'all', short: 'All' }, ...subjectsWithNotes].map(s => (
                <button key={s.id} role="tab" aria-selected={subject === s.id} className={'tab' + (subject === s.id ? ' on' : '')} onClick={() => setSubject(s.id)}>{s.short}</button>
              ))}
            </div>
          )}
        </>
      )}

      {groups.map(g => (
        <section key={g.page} className="nl-group">
          <button className="nl-head" onClick={() => navigate(g.page)}>
            <span className="num th-control">{g.info.num ?? <Icon name="home" />}</span>
            <span className="grow"><b>{g.info.title}</b><small>{g.info.sub} · {g.notes.length} note{g.notes.length > 1 ? 's' : ''}</small></span>
          </button>
          {g.notes.map(n => <NoteRow key={n.id} note={n} />)}
        </section>
      ))}

      {notes.length > 0 && shown === 0 && <p className="empty">No notes match “{q}”.</p>}

      {notes.length === 0 && (
        <div className="empty nl-empty">
          <span className="nl-big note-lime" aria-hidden="true"><NoteIcon name="lines" /></span>
          <p><b>No notes yet</b></p>
          <p>Open any chapter and tap the neon note button above the menu to stick a note on that page. It will show up here so you can jump back to it.</p>
        </div>
      )}
    </>
  );
}
