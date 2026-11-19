import { searchRepository } from '../repositories/search.repository.js';
import { stripHtml, snippet } from '../utils/text.js';

const MAX_RESULTS = 60;

export const searchService = {
  search(text) {
    const t = text.toLowerCase();
    const results = [];
    for (const ch of searchRepository.chapters(text)) {
      for (const s of JSON.parse(ch.sections)) {
        const body = stripHtml(s.body);
        const i = (s.h + ' ' + body).toLowerCase().indexOf(t);
        if (i >= 0) results.push({ type: 'note', title: s.h, chapterId: ch.id, label: `${ch.subject} · Ch ${ch.num} note`, go: `/c/${ch.id}`, snippet: snippet(body, Math.max(0, i - s.h.length - 1)) });
      }
    }
    searchRepository.cases(text).forEach(r => results.push({ type: 'case', title: `${r.company}: ${r.title}`, chapterId: r.id, label: `${r.subject} · Ch ${r.num} real life`, go: `/c/${r.id}/cases` }));
    searchRepository.cards(text).forEach(r => results.push({ type: 'card', title: r.question, chapterId: r.id, label: `${r.subject} · Ch ${r.num} flashcard`, go: `/c/${r.id}/cards` }));
    searchRepository.code(text).forEach(r => results.push({ type: 'code', title: r.title, chapterId: r.id, label: `${r.subject} · Ch ${r.num} code`, go: `/c/${r.id}/code` }));
    searchRepository.skills(text).forEach(r => results.push({ type: 'skill', title: r.title, label: 'SE essentials', go: `/skill/${r.id}` }));
    return { results: results.slice(0, MAX_RESULTS), total: results.length };
  }
};
