// "My notes": every sticky note in one list, grouped by the page it sits on. Tap a note to jump
// straight to that page; the note pops out its preview there. Export saves them as a file.
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '../components/TopBar.jsx';
import Icon from '../components/Icon.jsx';
import NoteIcon from '../features/notes/NoteIcon.jsx';
import { useContent } from '../hooks/useContent.js';
import { navigate } from '../hooks/useHashRoute.js';
import { describePage, focusNote } from '../features/notes/pageInfo.js';
import { hasPhotos } from '../features/notes/richtext.js';
import { exportNotes, readBackup } from '../features/notes/exportNotes.js';
import { importNotes } from '../redux/notesSlice.js';

const FORMATS = [
  ['pdf', 'PDF', 'Opens print, choose “Save as PDF”', 'Pdf'],
  ['doc', 'Word document', '.doc, opens in Word or Google Docs', 'Doc'],
  ['html', 'Web page', '.html, opens in any browser, keeps photos', 'Web'],
  ['md', 'Markdown', '.md, for Notion, Obsidian, GitHub', 'MD'],
  ['txt', 'Plain text', '.txt, words only', 'Txt'],
  ['backup', 'Backup file', '.json, restore on any device, keeps photos', 'Bak']
];

function ExportSheet({ groups, total, onClose }) {
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState('');
  const count = groups.reduce((s, g) => s + g.notes.length, 0);
  useEffect(() => {
    const key = e => { if (e.key === 'Escape') onClose(); };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  }, [onClose]);
  const run = async id => {
    setBusy(id);
    setError('');
    try { await exportNotes(id, groups); if (id !== 'pdf') onClose(); }
    catch (e) { setError(e.message || 'Could not export.'); }
    finally { setBusy(null); }
  };
  return createPortal(
    <div className="sheet-bg" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label="Export notes">
        <span className="sheet-grab" aria-hidden="true" />
        <div className="sheet-head">
          <div><b>Export {count} note{count === 1 ? '' : 's'}</b><small>{count === total ? 'All your notes, grouped by page' : `${count} of ${total} notes you picked, grouped by page`} · pick a file type</small></div>
          <button className="icon-btn light" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        </div>
        {FORMATS.map(([id, label, sub, tag]) => (
          <button key={id} className="row sheet-row" onClick={() => run(id)} disabled={!!busy || !count}>
            <span className={`sheet-tag${id === 'pdf' ? ' hot' : ''}`}>{tag}</span>
            <span className="grow"><b>{label}</b><small>{busy === id ? 'Preparing…' : sub}</small></span>
            <span className="playdot"><Icon name="download" /></span>
          </button>
        ))}
        {error && <p className="sheet-error" role="alert">{error}</p>}
      </div>
    </div>,
    document.body
  );
}

const ago = t => {
  if (!t) return '';
  const m = Math.round((Date.now() - t) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m} min ago`;
  if (m < 1440) return `${Math.round(m / 60)} h ago`;
  return new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
};

function NoteRow({ note, selecting, picked, onToggle }) {
  const [first, ...rest] = (note.text || '').split('\n').map(s => s.trim()).filter(Boolean);
  const photo = hasPhotos(note.html);
  const links = (note.links || []).length;
  const go = () => { focusNote(note.id, note.page); navigate(note.page); };
  return (
    <button className={`nl-note note-${note.color}${selecting && picked ? ' picked' : ''}`} onClick={selecting ? onToggle : go}
      role={selecting ? 'checkbox' : undefined} aria-checked={selecting ? picked : undefined}>
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
      {selecting
        ? <span className={`nl-check${picked ? ' on' : ''}`} aria-hidden="true"><Icon name="check" width={3} /></span>
        : <span className="playdot"><Icon name="chev" /></span>}
    </button>
  );
}

export default function Notes() {
  const notes = useSelector(s => s.notes);
  const content = useContent();
  const [q, setQ] = useState('');
  const [subject, setSubject] = useState('all');
  const [sheet, setSheet] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const [picked, setPicked] = useState(() => new Set());
  const [toast, setToast] = useState('');
  const fileInput = useRef(null);
  const dispatch = useDispatch();

  const restore = async e => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      const list = await readBackup(file);
      dispatch(importNotes(list));
      setToast(`Restored ${list.length} note${list.length === 1 ? '' : 's'}`);
    } catch (err) {
      setToast(err instanceof SyntaxError ? 'That file is not a notes backup.' : err.message);
    }
    setTimeout(() => setToast(''), 3500);
  };

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
  const visibleIds = groups.flatMap(g => g.notes.map(n => n.id));
  const chosen = visibleIds.filter(id => picked.has(id));
  const allChosen = visibleIds.length > 0 && chosen.length === visibleIds.length;
  const chosenGroups = groups.map(g => ({ ...g, notes: g.notes.filter(n => picked.has(n.id)) })).filter(g => g.notes.length);

  const startSelecting = () => { setPicked(new Set(visibleIds)); setSelecting(true); };   // everything ticked to start
  const stopSelecting = () => { setSelecting(false); setSheet(false); };
  const toggle = ids => setPicked(prev => {
    const next = new Set(prev);
    const on = ids.every(id => next.has(id));
    ids.forEach(id => (on ? next.delete(id) : next.add(id)));
    return next;
  });

  // hide the floating "+ note" button while choosing, the export bar sits there
  useEffect(() => {
    document.documentElement.classList.toggle('choosing-notes', selecting);
    return () => document.documentElement.classList.remove('choosing-notes');
  }, [selecting]);
  const shown = groups.reduce((s, g) => s + g.notes.length, 0);

  return (
    <>
      <TopBar title="My notes" sub={notes.length ? `${notes.length} note${notes.length > 1 ? 's' : ''} on ${pages} page${pages > 1 ? 's' : ''}` : 'All your sticky notes in one place'} back={false}>
        {selecting
          ? <button className="pill-btn" onClick={stopSelecting}>Cancel</button>
          : <>
              <button className="icon-btn light" onClick={() => fileInput.current.click()} aria-label="Restore notes from a backup file" title="Restore"><Icon name="upload" /></button>
              {notes.length > 0 && <button className="icon-btn" onClick={startSelecting} aria-label="Choose notes to export" title="Export"><Icon name="download" /></button>}
            </>}
      </TopBar>
      <input ref={fileInput} type="file" accept="application/json,.json" hidden onChange={restore} />
      {sheet && <ExportSheet groups={chosenGroups} total={notes.length} onClose={() => setSheet(false)} />}
      {selecting && (
        <div className="sel-bar" role="region" aria-label="Export selection">
          <button className="sel-all" onClick={() => toggle(visibleIds)} role="checkbox" aria-checked={allChosen}>
            <span className={`nl-check${allChosen ? ' on' : ''}`} aria-hidden="true"><Icon name="check" width={3} /></span>
            {allChosen ? 'All' : 'Select all'}
          </button>
          <span className="sel-count">{chosen.length} chosen</span>
          <button className="sel-go" onClick={() => setSheet(true)} disabled={!chosen.length}><Icon name="download" /> Export</button>
        </div>
      )}
      {selecting && <p className="sel-hint">Tick the notes you want in the file. Tap a page title to tick all of its notes.</p>}
      {toast && <div className="toast" role="status">{toast}</div>}

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
          {(() => {
            const ids = g.notes.map(n => n.id);
            const on = ids.every(id => picked.has(id));
            return (
              <button className="nl-head" onClick={() => (selecting ? toggle(ids) : navigate(g.page))}
                role={selecting ? 'checkbox' : undefined} aria-checked={selecting ? on : undefined}>
                <span className="num th-control">{g.info.num ?? <Icon name="home" />}</span>
                <span className="grow"><b>{g.info.title}</b><small>{g.info.sub} · {g.notes.length} note{g.notes.length > 1 ? 's' : ''}</small></span>
                {selecting && <span className={`nl-check${on ? ' on' : ''}`} aria-hidden="true"><Icon name="check" width={3} /></span>}
              </button>
            );
          })()}
          {g.notes.map(n => <NoteRow key={n.id} note={n} selecting={selecting} picked={picked.has(n.id)} onToggle={() => toggle([n.id])} />)}
        </section>
      ))}

      {notes.length > 0 && shown === 0 && <p className="empty">No notes match “{q}”.</p>}

      {notes.length === 0 && (
        <div className="empty nl-empty">
          <span className="nl-big note-lime" aria-hidden="true"><NoteIcon name="lines" /></span>
          <p><b>No notes yet</b></p>
          <p>Open any chapter and tap the neon note button above the menu to stick a note on that page. It will show up here so you can jump back to it.</p>
          <button className="btn" onClick={() => fileInput.current.click()} style={{ marginTop: 12 }}><Icon name="upload" /> Restore from a backup</button>
        </div>
      )}
    </>
  );
}
