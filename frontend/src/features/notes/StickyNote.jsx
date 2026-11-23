// One sticky note on the page: a small preview card, or a coloured dot. Drag either anywhere;
// tap to open the full-screen editor. The "–" button shrinks the card to a dot.
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote } from '../../redux/notesSlice.js';
import { clean } from './richtext.js';
import { showPhotos } from './images.js';
import NoteIcon from './NoteIcon.jsx';

const DRAG_THRESHOLD = 5;      // px moved before a press counts as a drag, not a tap
const CLOSE_MS = 170;          // matches the shrink animation in index.css

export default function StickyNote({ note, top, left, width, onDrop, onOpen, hidden }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const preview = useRef(null);
  const drag = useRef(null);
  const [pos, setPos] = useState(null);                          // live position while dragging
  const [closing, setClosing] = useState(false);
  const html = useMemo(() => clean(note.html), [note.html]);
  const links = note.links || [];

  useEffect(() => { showPhotos(preview.current); }, [html, note.open]);

  const onPointerDown = e => {
    if (e.button !== 0 || e.target.closest('.note-btn')) return;
    const r = ref.current.getBoundingClientRect();
    drag.current = { x: e.clientX, y: e.clientY, grabX: e.clientX - r.left, grabY: e.clientY - r.top, moved: false };
    ref.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = e => {
    const d = drag.current;
    if (!d) return;
    if (!d.moved && Math.hypot(e.clientX - d.x, e.clientY - d.y) < DRAG_THRESHOLD) return;
    d.moved = true;
    // scroll the page when dragging near the top or bottom edge
    if (e.clientY > innerHeight - 110) window.scrollBy(0, 14);
    else if (e.clientY < 70) window.scrollBy(0, -14);
    const root = ref.current.offsetParent.getBoundingClientRect();
    const w = ref.current.offsetWidth;
    setPos({
      left: Math.min(Math.max(e.clientX - d.grabX - root.left, 0), root.width - w),
      top: Math.max(e.clientY - d.grabY - root.top, 0)
    });
  };

  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const r = ref.current.getBoundingClientRect();
    if (!d.moved) return onOpen(note.id, { x: r.left + r.width / 2, y: r.top + r.height / 2 });   // a tap
    ref.current.style.visibility = 'hidden';       // so the drop point finds the page, not the note
    onDrop(note.id, r.left, r.top);
    ref.current.style.visibility = '';
    setPos(null);
  };

  const shrink = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return dispatch(updateNote({ id: note.id, open: false }));
    setClosing(true);
    setTimeout(() => { setClosing(false); dispatch(updateNote({ id: note.id, open: false })); }, CLOSE_MS);
  };

  const style = { top: pos?.top ?? top, left: pos?.left ?? left, ...(note.open ? { width } : {}), ...(hidden ? { visibility: 'hidden' } : {}) };
  const handlers = { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: () => { drag.current = null; setPos(null); } };
  const cls = `note note-${note.color}${pos ? ' dragging' : ''}`;
  const summary = note.text ? note.text.slice(0, 60) : html.includes('<img') ? 'Photo note' : links.length ? `${links.length} link${links.length > 1 ? 's' : ''}` : 'Empty note';

  if (!note.open) {
    return (
      <div ref={ref} className={`${cls} note-small`} style={style} {...handlers}>
        <button className="note-dot" aria-label={`Open note: ${summary}`} title={note.text.slice(0, 80)}>
          <NoteIcon name={note.text || !links.length ? 'lines' : 'link'} />
        </button>
      </div>
    );
  }

  return (
    <div ref={ref} className={`${cls} note-card${closing ? ' closing' : ''}`} style={style} {...handlers}
      role="button" tabIndex={0} aria-label={`Open note: ${summary}`}
      onKeyDown={e => { if (e.key === 'Enter' && e.target === e.currentTarget) onOpen(note.id); }}>
      <div className="note-bar" title="Drag to move, tap to open">
        <span className="note-grip" aria-hidden="true">⋮⋮</span>
        {links.length > 0 && <span className="note-chip"><NoteIcon name="link" />{links.length}</span>}
        <span className="note-open-hint" aria-hidden="true"><NoteIcon name="expand" /></span>
        <button className="note-btn" onClick={shrink} aria-label="Shrink to a dot" title="Shrink"><NoteIcon name="minus" /></button>
      </div>
      {html
        ? <div ref={preview} className="note-preview note-rich" dangerouslySetInnerHTML={{ __html: html }} />
        : <div className="note-preview is-blank">Tap to write…</div>}
    </div>
  );
}
