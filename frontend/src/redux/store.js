import { configureStore } from '@reduxjs/toolkit';
import progress from './progressSlice.js';
import { storage } from '../utils/storage.js';

export const store = configureStore({ reducer: { progress } });

// Save progress on this device whenever it changes.
let last;
store.subscribe(() => {
  const now = store.getState().progress;
  if (now !== last) { last = now; storage.set('progress', now); }
});
