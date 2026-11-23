// Shows this page's sticky notes on top of the content, the floating "+ note" button, and the
// full-screen editor for the note being written.
// Notes scroll with the page; each one is placed next to the element it was dropped on.
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import StickyNote from './StickyNote.jsx';
import NoteEditor from './NoteEditor.jsx';
import { addNote, updateNote } from '../../redux/notesSlice.js';
import { makeAnchor, topOf } from './anchor.js';
import { useHashRoute } from '../../hooks/useHashRoute.js';

const NOTE_WIDTH = 210;

export default function NotesLayer() {
  const { path: page } = useHashRoute();
  const all = useSelector(s => s.notes);                    // same array until a note changes
  const notes = useMemo(() => all.filter(n => n.page === page), [all, page]);
  const dispatch = useDispatch();
  const layerRef = useRef(null);
  const [layout, setLayout] = useState({ width: 0, tops: {} });
  const [editing, setEditing] = useState(null);             // { id, origin } of the open editor
  const editingNote = editing && all.find(n => n.id === editing.id);

  const root = () => layerRef.current?.parentElement;     // the page (main#app)

  // Work out where every note goes. Runs after render, on resize, and when the page changes size.
  const measure = useCallback(() => {
    const r = root();
    if (!r) return;
    const tops = Object.fromEntries(notes.map(n => [n.id, Math.round(topOf(r, n.anchor))]));
    const width = r.clientWidth;
    // only update when something really moved, so measuring never loops
    setLayout(prev => (prev.width === width && JSON.stringify(prev.tops) === JSON.stringify(tops) ? prev : { width, tops }));
  }, [notes]);

  useLayoutEffect(() => { measure(); }, [measure, page]);
  useEffect(() => {
    const r = root();
    if (!r) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(r);
    const t = setTimeout(measure, 350);                      // after the page fade-in settles
    return () => { ro.disconnect(); clearTimeout(t); };
  }, [measure]);

  const drop = (id, clientX, clientY) => {
    const r = root();
    const anchor = makeAnchor(r, layerRef.current, clientX, clientY);
    const x = (clientX - r.getBoundingClientRect().left) / r.clientWidth;
    dispatch(updateNote({ id, anchor, x }));
  };

  const open = (id, origin) => setEditing({ id, origin });

  const add = e => {
    const r = root();
    const w = r.clientWidth;
    const clientX = r.getBoundingClientRect().left + Math.max(8, (w - Math.min(NOTE_WIDTH, w - 16)) / 2);
    const clientY = Math.round(innerHeight * 0.3);
    const action = addNote({ page, anchor: makeAnchor(r, layerRef.current, clientX, clientY), x: (clientX - r.getBoundingClientRect().left) / w });
    dispatch(action);
    const b = e.currentTarget.getBoundingClientRect();
    open(action.payload.id, { x: b.left + b.width / 2, y: b.top + b.height / 2 });
  };

  const width = Math.min(NOTE_WIDTH, Math.max(160, layout.width - 16));
  const leftOf = n => {
    const noteW = n.open ? width : 34;
    return Math.min(Math.max(n.x * layout.width, 4), Math.max(4, layout.width - noteW - 4));
  };

  return (
    <div ref={layerRef} className="notes-layer">
      {layout.width > 0 && notes.map(n => (
        <StickyNote key={n.id} note={n} top={layout.tops[n.id] ?? n.anchor.y} left={leftOf(n)} width={width}
          onDrop={drop} onOpen={open} hidden={n.id === editing?.id} />
      ))}
      {createPortal(
        <button className="note-add" onClick={add} aria-label="Add a sticky note to this page">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h12l4 4v12H4z M16 4v4h4 M12 10v6 M9 13h6" /></svg>
          {notes.length > 0 && <span className="note-count">{notes.length}</span>}
        </button>,
        document.body
      )}
      {editingNote && createPortal(
        <NoteEditor key={editingNote.id} note={editingNote} origin={editing.origin} onClose={() => setEditing(null)} />,
        document.body
      )}
    </div>
  );
}
