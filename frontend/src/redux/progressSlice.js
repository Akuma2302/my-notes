// Study progress: welcome done, name, chapters read, tabs visited, bookmarks, best quiz scores.
import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../utils/storage.js';

const defaults = { onboarded: false, name: '', read: [], visited: {}, saved: [], best: {}, filter: 'all', subject: 'sqa' };
const initialState = { ...defaults, ...storage.get('progress', {}) };

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    finishWelcome(state, { payload: name }) {
      state.onboarded = true;
      state.name = (name || '').trim().slice(0, 30);
    },
    setName(state, { payload }) { state.name = (payload || '').slice(0, 30); },
    markRead(state, { payload: id }) {
      if (!state.read.includes(id)) state.read.push(id);
    },
    visitTab(state, { payload: { id, tab } }) {
      const list = state.visited[id] || [];
      if (!list.includes(tab)) state.visited[id] = [...list, tab];
    },
    toggleSaved(state, { payload: key }) {
      state.saved = state.saved.includes(key) ? state.saved.filter(k => k !== key) : [...state.saved, key];
    },
    recordScore(state, { payload: { key, score } }) {
      if (state.best[key] == null || score > state.best[key]) state.best[key] = score;
    },
    setFilter(state, { payload }) { state.filter = payload; },
    setSubject(state, { payload }) { state.subject = payload; state.filter = 'all'; },
    resetProgress() { return { ...defaults, onboarded: true }; }
  }
});

export const { finishWelcome, setName, markRead, visitTab, toggleSaved, recordScore, setFilter, setSubject, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;

export const selectProgress = s => s.progress;
export const selectRead = s => s.progress.read;
export const selectVisited = s => s.progress.visited;
export const selectSaved = s => s.progress.saved;
export const selectBest = s => s.progress.best;
export const selectFilter = s => s.progress.filter;
export const selectSubject = s => s.progress.subject || 'sqa';

// How far through a chapter: share of its tabs opened (note, map, links, ...).
export const chapterProgress = (visited, chapter, tabCount) => Math.min(tabCount, (visited[chapter.id] || []).length);
