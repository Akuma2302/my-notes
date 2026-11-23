// One sticky note on the page. It rests as a small coloured dot; tap it and a preview card
// pops out; tap the card (or ⤢) for the full-screen editor. "–" or tapping elsewhere turns the
// preview back into the dot. Both the dot and the card can be dragged anywhere.
import { useEffect, useMemo, useRef, useState } from 'react';
import { clean } from './richtext.js';
import { showPhotos } from './images.js';
import NoteIcon from './NoteIcon.jsx';

const DRAG_THRESHOLD = 5;      // px moved before a press counts as a drag, not a tap
const CLOSE_MS = 170;          // matches the shrink animation in index.css
const CARD_W = 210;

export default function StickyNote({ note, top, left, areaWidth, onDrop, onOpen, hidden }) {
  const ref = useRef(null);
  const preview = useRef(null);
  const drag = useRef(null);
  const [pos, setPos] = useState(null);                          // live position while dragging
  const [peek, setPeek] = useState(false);                       // preview card showing
  const [closing, setClosing] = useState(false);
  const html = useMemo(() => clean(note.html), [note.html]);
  const links = note.links || [];
  const width = Math.min(CARD_W, areaWidth - 16);

  useEffect(() => { if (peek) showPhotos(preview.current); }, [peek, html]);

  const shrink = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setPeek(false);
    setClosing(true);
    setTimeout(() => { setClosing(false); setPeek(false); }, CLOSE_MS);
  };

  // tapping anywhere else closes the preview
  useEffect(() => {
    if (!peek) return;
    const away = e => { if (!ref.current?.contains(e.target)) shrink(); };
    document.addEventListener('pointerdown', away);
    return () => document.removeEventListener('pointerdown', away);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peek]);

  const expand = () => {
    const r = ref.current.getBoundingClientRect();
    setPeek(false);
    onOpen(note.id, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

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
    if (!d.moved) return peek ? expand() : setPeek(true);        // a tap: dot -> preview -> full screen
    const r = ref.current.getBoundingClientRect();
    ref.current.style.visibility = 'hidden';       // so the drop point finds the page, not the note
    onDrop(note.id, r.left, r.top);
    ref.current.style.visibility = '';
    setPos(null);
  };

  const handlers = { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: () => { drag.current = null; setPos(null); } };
  const cls = `note note-${note.color}${pos ? ' dragging' : ''}`;
  const hasPhoto = html.includes('<img');
  const summary = note.text ? note.text.slice(0, 60) : hasPhoto ? 'Photo note' : links.length ? `${links.length} link${links.length > 1 ? 's' : ''}` : 'Empty note';
  const hide = hidden ? { visibility: 'hidden' } : {};

  if (!peek) {
    const icon = !note.text && hasPhoto ? 'photo' : !note.text && links.length ? 'link' : 'lines';
    return (
      <div ref={ref} className={`${cls} note-small`} style={{ top: pos?.top ?? top, left: pos?.left ?? left, ...hide }} {...handlers}>
        <button className="note-dot" aria-label={`Show note: ${summary}`} title={note.text.slice(0, 80)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPeek(true); } }}>
          <NoteIcon name={icon} />
        </button>
      </div>
    );
  }

  const cardLeft = Math.max(4, Math.min(left, areaWidth - width - 4));
  return (
    <div ref={ref} className={`${cls} note-card${closing ? ' closing' : ''}`}
      style={{ top: pos?.top ?? top, left: pos?.left ?? cardLeft, width, ...hide }} {...handlers}
      role="button" tabIndex={0} aria-label={`Open note full screen: ${summary}`}
      onKeyDown={e => { if (e.key === 'Enter' && e.target === e.currentTarget) expand(); if (e.key === 'Escape') shrink(); }}>
      <div className="note-bar" title="Drag to move, tap to open">
        <span className="note-grip" aria-hidden="true">⋮⋮</span>
        {links.length > 0 && <span className="note-chip"><NoteIcon name="link" />{links.length}</span>}
        <button className="note-btn" onClick={expand} aria-label="Open full screen" title="Full screen"><NoteIcon name="expand" /></button>
        <button className="note-btn" onClick={shrink} aria-label="Shrink to a dot" title="Shrink"><NoteIcon name="minus" /></button>
      </div>
      {html
        ? <div ref={preview} className="note-preview note-rich" dangerouslySetInnerHTML={{ __html: html }} />
        : <div className="note-preview is-blank">Tap to write…</div>}
    </div>
  );
}
