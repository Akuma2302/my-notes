// Sticky notes. Each note belongs to one page (e.g. "/c/ob3/tutorial") and is anchored to the
// element it was dropped on (a path of child indexes inside the page), plus an offset from it.
// Content is rich text (html, cleaned by features/notes/richtext.js) plus a plain-text copy.
import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../utils/storage.js';
import { textToHtml } from '../features/notes/richtext.js';

export const NOTE_COLORS = ['lime', 'cyan', 'pink', 'orange'];

// notes saved before the neon palette / rich text keep their colour and words
const OLD_COLORS = { yellow: 'lime', green: 'lime', blue: 'cyan', pink: 'pink' };
const load = () => storage.get('notes', []).map(n => ({
  links: [],
  ...n,
  html: n.html ?? textToHtml(n.text),
  text: n.text || '',
  color: NOTE_COLORS.includes(n.color) ? n.color : OLD_COLORS[n.color] || 'lime'
}));

const notesSlice = createSlice({
  name: 'notes',
  initialState: load(),
  reducers: {
    addNote: {
      reducer(state, { payload }) { state.push(payload); },
      prepare: ({ page, anchor, x }) => ({
        payload: { id: `n${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, page, anchor, x, color: 'lime', html: '', text: '', links: [], open: true, created: Date.now(), updated: Date.now() }
      })
    },
    updateNote(state, { payload: { id, ...changes } }) {
      const n = state.find(x => x.id === id);
      if (n) Object.assign(n, changes, 'html' in changes || 'links' in changes ? { updated: Date.now() } : {});
    },
    // restore from a backup file: new notes are added, a note already here keeps the newer copy
    importNotes(state, { payload: list }) {
      for (const n of list) {
        const i = state.findIndex(x => x.id === n.id);
        if (i < 0) state.push(n);
        else if ((n.updated || 0) > (state[i].updated || 0)) state[i] = n;
      }
    },
    deleteNote(state, { payload: id }) {
      return state.filter(n => n.id !== id);
    }
  }
});

export const { addNote, updateNote, deleteNote, importNotes } = notesSlice.actions;
export default notesSlice.reducer;
