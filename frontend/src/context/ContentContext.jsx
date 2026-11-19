// Loads all notes once and shares them with every page.
import { createContext, useEffect, useMemo, useState } from 'react';
import { getContent } from '../services/contentService.js';

export const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });

  useEffect(() => {
    getContent()
      .then(data => setState({ status: 'ready', data, error: null }))
      .catch(error => setState({ status: 'error', data: null, error }));
  }, []);

  const value = useMemo(() => {
    if (!state.data) return state;
    const { chapters, skills, subjects = [] } = state.data;
    const bySubject = Object.fromEntries(subjects.map(s => [s.id, chapters.filter(c => c.subject === s.id)]));
    return {
      ...state,
      ...state.data,
      subjects,
      subjectById: Object.fromEntries(subjects.map(s => [s.id, s])),
      chaptersOf: id => bySubject[id] || [],
      chapterById: Object.fromEntries(chapters.map(c => [c.id, c])),
      skillById: Object.fromEntries(skills.map(s => [s.id, s]))
    };
  }, [state]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
