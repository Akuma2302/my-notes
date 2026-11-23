import { configureStore } from '@reduxjs/toolkit';
import progress from './progressSlice.js';
import notes from './notesSlice.js';
import { storage } from '../utils/storage.js';

export const store = configureStore({ reducer: { progress, notes } });

// Save progress and sticky notes on this device whenever they change.
const last = {};
store.subscribe(() => {
  const state = store.getState();
  for (const key of ['progress', 'notes']) {
    if (state[key] !== last[key]) { last[key] = state[key]; storage.set(key, state[key]); }
  }
});
