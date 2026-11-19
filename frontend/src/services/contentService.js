// Gets notes from the backend API, or from the built-in copy in the offline phone build.
import { request } from './api.js';
import { storage } from '../utils/storage.js';
import { searchLocally } from '../utils/localSearch.js';

export const IS_OFFLINE_BUILD = import.meta.env.VITE_STATIC === 'true';
const CACHE_KEY = 'content-cache';

export async function getContent() {
  if (IS_OFFLINE_BUILD) return (await import('./staticContent.js')).staticContent;
  try {
    const { data } = await request('/content');
    storage.set(CACHE_KEY, data);            // keep a copy for when the server is off
    return data;
  } catch (err) {
    const cached = storage.get(CACHE_KEY, null);
    if (cached) return cached;
    throw err;
  }
}

export async function search(query, content) {
  if (IS_OFFLINE_BUILD) return searchLocally(content, query);
  try {
    const { data, meta } = await request('/search?q=' + encodeURIComponent(query));
    return { results: data, total: meta.total };
  } catch {
    return searchLocally(content, query);
  }
}

// Risks: saved in the database, or on the phone in the offline build.
const localRisks = {
  list: () => storage.get('risks', []).map(r => ({ ...r, exposure: Math.round((r.probability / 100) * r.impact * 100) / 100 })).sort((a, b) => b.exposure - a.exposure),
  create: r => { const list = storage.get('risks', []); const item = { ...r, id: Date.now() }; storage.set('risks', [...list, item]); return item; },
  remove: id => storage.set('risks', storage.get('risks', []).filter(r => r.id !== id))
};

export const riskService = IS_OFFLINE_BUILD ? {
  list: async () => localRisks.list(),
  create: async r => localRisks.create(r),
  remove: async id => localRisks.remove(id)
} : {
  list: async () => (await request('/risks')).data,
  create: async r => (await request('/risks', { method: 'POST', body: r })).data,
  remove: async id => request('/risks/' + id, { method: 'DELETE' })
};
