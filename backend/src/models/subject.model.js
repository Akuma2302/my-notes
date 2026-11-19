import { parseJson } from '../utils/text.js';

export const SUBJECT_STATUS = ['active', 'coming_soon'];

export const toSubject = row => ({
  id: row.id, code: row.code, title: row.title, short: row.short, description: row.description,
  status: row.status, themes: parseJson(row.themes) || {},
  ...(row.chapter_count != null ? { chapterCount: row.chapter_count } : {})
});
