// Full-screen note editor, like a phone notes app: rich text (bold, italic, underline, strike,
// heading, highlight, bullet / numbered / check lists), links and photos. Saves as you type.
// The phone's back button closes it (it adds one history step while open).
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NOTE_COLORS, deleteNote, updateNote } from '../../redux/notesSlice.js';
import { replaceRoute } from '../../hooks/useHashRoute.js';
import { clean, hasPhotos, htmlToText, photoIds } from './richtext.js';
import { deletePhotos, savePhoto, showPhotos } from './images.js';
import { cleanUrl, linkInfo, linkProps } from './links.js';
import NoteIcon from './NoteIcon.jsx';

const CLOSE_MS = 200;
const SAVE_MS = 350;
const when = t => new Date(t).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

const Tool = ({ on, label, onPress, children }) => (
  <button type="button" className={`ned-tool${on ? ' on' : ''}`} aria-label={label} aria-pressed={on === undefined ? undefined : !!on} title={label}
    onPointerDown={e => e.preventDefault()} onClick={onPress}>{children}</button>
);

export default function NoteEditor({ note, origin, onClose }) {
  const dispatch = useDispatch();
  const box = useRef(null);
  const fileInput = useRef(null);
  const range = useRef(null);                  // last caret/selection inside the note
  const saved = useRef(note.html);
  const timer = useRef(0);
  const done = useRef(false);
  const deleting = useRef(false);
  const photosAtOpen = useRef(photoIds(note.html));
  const added = useRef([]);                    // photos added during this visit
  const [active, setActive] = useState({});
  const [empty, setEmpty] = useState(!note.html);
  const [linkRow, setLinkRow] = useState(null); // null | { forText: bool }
  const [draft, setDraft] = useState('');
  const [picked, setPicked] = useState(null);  // a tapped photo
  const [busy, setBusy] = useState(false);
  const [closing, setClosing] = useState(false);
  const [kb, setKb] = useState(0);             // on-screen keyboard height (iOS)
  const links = note.links || [];
  const linksRef = useRef(links);
  linksRef.current = links;

  // ---------- load, save, close ----------
  useLayoutEffect(() => {
    const el = box.current;
    el.innerHTML = clean(note.html);
    showPhotos(el);
    try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch { /* old browsers */ }
    if (!note.html) el.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = useCallback(() => {
    clearTimeout(timer.current);
    const el = box.current;
    if (!el) return saved.current;
    const html = clean(el.innerHTML);
    if (html !== saved.current) {
      saved.current = html;
      dispatch(updateNote({ id: note.id, html, text: htmlToText(html) }));
    }
    return html;
  }, [dispatch, note.id]);

  const changed = () => {
    setEmpty(!box.current.textContent.trim() && !box.current.querySelector('img,li'));
    clearTimeout(timer.current);
    timer.current = setTimeout(save, SAVE_MS);
  };

  const finish = useCallback((after) => {
    if (done.current) return;
    done.current = true;
    const html = save();
    const keep = new Set(photoIds(html));
    const nothing = deleting.current || (!htmlToText(html) && !hasPhotos(html) && !linksRef.current.length);
    deletePhotos([...photosAtOpen.current, ...added.current].filter(id => nothing || !keep.has(id)));
    setClosing(true);
    setTimeout(() => {
      if (nothing) dispatch(deleteNote(note.id));               // empty notes tidy themselves away
      onClose();
      after?.();
    }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : CLOSE_MS);
  }, [save, dispatch, note.id, onClose]);

  // back button / Escape close the editor
  useEffect(() => {
    history.pushState({ noteEditor: note.id }, '');
    const onPop = () => finish();
    const onKey = e => { if (e.key === 'Escape') close(); };
    addEventListener('popstate', onPop);
    addEventListener('keydown', onKey);
    const html = document.documentElement;
    const overflow = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => { removeEventListener('popstate', onPop); removeEventListener('keydown', onKey); html.style.overflow = overflow; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => (history.state?.noteEditor === note.id ? history.back() : finish());

  // keep the toolbar above the iPhone keyboard
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const fit = () => setKb(Math.max(0, Math.round(innerHeight - vv.height - vv.offsetTop)));
    vv.addEventListener('resize', fit);
    vv.addEventListener('scroll', fit);
    return () => { vv.removeEventListener('resize', fit); vv.removeEventListener('scroll', fit); };
  }, []);

  // ---------- selection & formatting ----------
  const nodeAtCaret = () => {
    const s = getSelection();
    if (!s.rangeCount) return null;
    let n = s.anchorNode;
    if (n?.nodeType === 3) n = n.parentElement;
    return n && box.current?.contains(n) ? n : null;
  };

  const readState = useCallback(() => {
    const n = nodeAtCaret();
    if (!n) return;
    range.current = getSelection().getRangeAt(0).cloneRange();
    const q = c => { try { return document.queryCommandState(c); } catch { return false; } };
    const inBox = sel => { const e = n.closest(sel); return e && box.current.contains(e) ? e : null; };
    const inLink = !!inBox('a');            // links look bold + underlined, so check the real tags there
    setActive({
      bold: inLink || inBox('h2') ? !!inBox('b,strong') : q('bold'),
      italic: q('italic'),
      underline: inLink ? !!inBox('u') : q('underline'),
      strike: q('strikeThrough'),
      h: !!inBox('h2'), mark: !!inBox('mark'),
      check: !!inBox('ul[data-check]'), ul: !!inBox('ul:not([data-check])'), ol: !!inBox('ol'),
      link: inBox('a')?.getAttribute('href') || null
    });
  }, []);

  useEffect(() => {
    document.addEventListener('selectionchange', readState);
    return () => document.removeEventListener('selectionchange', readState);
  }, [readState]);

  // put the caret back where it was (buttons, the photo picker and the link box take focus)
  const restore = () => {
    const el = box.current;
    if (document.activeElement !== el) el.focus({ preventScroll: true });
    const s = getSelection();
    if (range.current && el.contains(range.current.startContainer)) { s.removeAllRanges(); s.addRange(range.current); }
    else if (!nodeAtCaret()) { const r = document.createRange(); r.selectNodeContents(el); r.collapse(false); s.removeAllRanges(); s.addRange(r); }
  };

  const exec = (cmd, value) => { restore(); document.execCommand(cmd, false, value); changed(); readState(); };

  const toggleHeading = () => exec('formatBlock', active.h ? 'p' : 'h2');

  const toggleChecklist = () => {
    restore();
    let ul = nodeAtCaret()?.closest('ul');
    if (ul?.hasAttribute('data-check')) return exec('insertUnorderedList');   // checklist -> plain text
    if (!ul) { document.execCommand('insertUnorderedList'); ul = nodeAtCaret()?.closest('ul'); }
    ul?.setAttribute('data-check', '');
    changed(); readState();
  };

  const toggleMark = () => {
    restore();
    const m = nodeAtCaret()?.closest('mark');
    const s = getSelection();
    if (m && box.current.contains(m)) m.replaceWith(...m.childNodes);
    else if (s.rangeCount && !s.isCollapsed) {
      const r = s.getRangeAt(0);
      const mark = document.createElement('mark');
      mark.append(r.extractContents());
      r.insertNode(mark);
      s.selectAllChildren(mark);
    } else return;
    changed(); readState();
  };

  // ---------- links ----------
  const onLinkButton = () => {
    if (active.link) return exec('unlink');
    const s = getSelection();
    const forText = !!nodeAtCaret() && !s.isCollapsed;
    if (forText) range.current = s.getRangeAt(0).cloneRange();
    setDraft('');
    setLinkRow(r => (r ? null : { forText }));
  };

  const addLink = e => {
    e.preventDefault();
    const url = cleanUrl(draft);
    if (!url) return;
    if (linkRow?.forText) exec('createLink', url);
    else if (!links.includes(url)) dispatch(updateNote({ id: note.id, links: [...links, url] }));
    setLinkRow(null);
    setDraft('');
  };

  const openLink = url => {
    if (url.startsWith('#/')) finish(() => replaceRoute(url.slice(1)));
    else window.open(url, '_blank', 'noopener,noreferrer');
  };

  // ---------- photos ----------
  const insertPhotos = async files => {
    const images = [...files].filter(f => f.type.startsWith('image/'));
    if (!images.length) return;
    setBusy(true);
    try {
      for (const file of images) {
        const attrs = await savePhoto(file);
        if (attrs['data-img']) added.current.push(attrs['data-img']);
        const attr = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
        exec('insertHTML', `<img ${attr} alt=""><p><br></p>`);
      }
      showPhotos(box.current);
    } finally {
      setBusy(false);
    }
  };

  const removePhoto = () => {
    picked?.remove();
    setPicked(null);
    changed();
  };

  // ---------- typing ----------
  const onPaste = e => {
    const files = [...(e.clipboardData?.files || [])];
    e.preventDefault();
    if (files.length) return insertPhotos(files);
    document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));   // no outside styles
  };

  const onClick = e => {
    const li = e.target.closest('ul[data-check] > li');
    if (li && e.clientX - li.getBoundingClientRect().left < 30) {      // tapped the tick box
      e.preventDefault();
      li.toggleAttribute('data-done');
      changed();
      return;
    }
    const img = e.target.closest('img');
    box.current.querySelectorAll('img.picked').forEach(i => i !== img && i.classList.remove('picked'));
    if (img) img.classList.add('picked');
    setPicked(img || null);
  };

  const remove = () => {
    if ((note.text || links.length || hasPhotos(saved.current)) && !window.confirm('Delete this note?')) return;
    deleting.current = true;
    close();
  };

  const style = {
    '--kb': `${kb}px`,
    '--ox': `${origin ? origin.x : innerWidth / 2}px`,
    '--oy': `${origin ? origin.y : innerHeight / 2}px`
  };

  return (
    <div className={`ned note-${note.color}${closing ? ' closing' : ''}`} style={style} role="dialog" aria-modal="true" aria-label="Note">
      <header className="ned-top">
        <button className="ned-round" onClick={close} aria-label="Done, close the note"><NoteIcon name="back" /></button>
        <div className="ned-when">
          <b>Note</b>
          <small>{note.updated ? `Edited ${when(note.updated)}` : 'New note'}</small>
        </div>
        <div className="note-colors" role="radiogroup" aria-label="Note colour">
          {NOTE_COLORS.map(c => (
            <button key={c} role="radio" aria-checked={note.color === c} aria-label={c} className={`note-swatch note-${c}`}
              onClick={() => dispatch(updateNote({ id: note.id, color: c }))} />
          ))}
        </div>
        <button className="ned-round ghost" onClick={remove} aria-label="Delete note"><NoteIcon name="trash" /></button>
      </header>

      <div className="ned-body">
        <div
          ref={box}
          className={`ned-text note-rich${empty ? ' is-empty' : ''}`}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label="Note text"
          data-placeholder="Start writing…"
          onInput={changed}
          onPaste={onPaste}
          onClick={onClick}
          onBlur={save}
        />

        {links.length > 0 && (
          <section className="ned-links" aria-label="Saved links">
            {links.map(url => {
              const info = linkInfo(url);
              return (
                <div key={url} className="note-link">
                  <a {...linkProps(url)} className="note-link-main" onClick={e => { if (info.internal) { e.preventDefault(); openLink(url); } }}>
                    {info.thumb
                      ? <img src={info.thumb} alt="" loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} />
                      : <span className="note-link-ic"><NoteIcon name={info.internal ? 'home' : 'globe'} /></span>}
                    <span className="note-link-txt"><b>{info.label}</b>{info.sub && <small>{info.sub}</small>}</span>
                  </a>
                  <button className="note-link-x" onClick={() => dispatch(updateNote({ id: note.id, links: links.filter(l => l !== url) }))} aria-label={`Remove link ${info.label}`}>
                    <NoteIcon name="close" />
                  </button>
                </div>
              );
            })}
          </section>
        )}
      </div>

      <div className="ned-dock">
        {linkRow && (
          <form className="ned-pop" onSubmit={addLink}>
            <input autoFocus value={draft} onChange={e => setDraft(e.target.value)} inputMode="url" aria-label="Link address"
              placeholder={linkRow.forText ? 'Link the selected words to…' : 'Paste a link to save…'} />
            <button type="submit" disabled={!cleanUrl(draft)}>Add</button>
            <button type="button" className="x" onClick={() => setLinkRow(null)} aria-label="Cancel"><NoteIcon name="close" /></button>
          </form>
        )}
        {!linkRow && (active.link || picked || busy) && (
          <div className="ned-pop">
            {busy && <span className="ned-busy">Adding photo…</span>}
            {!busy && picked && <button type="button" onClick={removePhoto}><NoteIcon name="trash" /> Remove photo</button>}
            {!busy && !picked && active.link && (
              <>
                <span className="ned-href">{active.link.replace(/^https?:\/\/(www\.)?/, '')}</span>
                <button type="button" onPointerDown={e => e.preventDefault()} onClick={() => openLink(active.link)}><NoteIcon name="open" /> Open</button>
              </>
            )}
          </div>
        )}

        <div className="ned-tools" role="toolbar" aria-label="Formatting">
          <Tool on={active.bold} label="Bold" onPress={() => exec('bold')}><b>B</b></Tool>
          <Tool on={active.italic} label="Italic" onPress={() => exec('italic')}><i>I</i></Tool>
          <Tool on={active.underline} label="Underline" onPress={() => exec('underline')}><u>U</u></Tool>
          <Tool on={active.strike} label="Strikethrough" onPress={() => exec('strikeThrough')}><s>S</s></Tool>
          <Tool on={active.h} label="Heading" onPress={toggleHeading}><b className="h">H</b></Tool>
          <Tool on={active.mark} label="Highlight" onPress={toggleMark}><NoteIcon name="mark" /></Tool>
          <span className="ned-sep" aria-hidden="true" />
          <Tool on={active.check} label="Checklist" onPress={toggleChecklist}><NoteIcon name="checks" /></Tool>
          <Tool on={active.ul} label="Bullet list" onPress={() => exec('insertUnorderedList')}><NoteIcon name="bullets" /></Tool>
          <Tool on={active.ol} label="Numbered list" onPress={() => exec('insertOrderedList')}><NoteIcon name="numbers" /></Tool>
          <span className="ned-sep" aria-hidden="true" />
          <Tool on={!!active.link || !!linkRow} label={active.link ? 'Remove link' : 'Add a link'} onPress={onLinkButton}><NoteIcon name={active.link ? 'unlink' : 'link'} /></Tool>
          <Tool label="Add a photo" onPress={() => fileInput.current.click()}><NoteIcon name="photo" /></Tool>
          <Tool label="Undo" onPress={() => exec('undo')}><NoteIcon name="undo" /></Tool>
        </div>
        <input ref={fileInput} type="file" accept="image/*" multiple hidden onChange={e => { insertPhotos(e.target.files); e.target.value = ''; }} />
      </div>
    </div>
  );
}
