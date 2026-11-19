// Same search as the backend, used by the offline phone build.
import { stripHtml } from './html.js';

export function searchLocally({ chapters, skills, subjectById = {} }, query) {
  const t = query.toLowerCase();
  const res = [];
  for (const c of chapters) {
    const sub = subjectById[c.subject]?.short || '';
    const L = kind => `${sub ? sub + ' · ' : ''}Ch ${c.num} ${kind}`;
    for (const s of c.sections) {
      const body = stripHtml(s.body);
      const i = body.toLowerCase().indexOf(t);
      if (i >= 0 || s.h.toLowerCase().includes(t)) res.push({ title: s.h, label: L('note'), go: `/c/${c.id}`, snippet: i >= 0 ? body.slice(Math.max(0, i - 40), i + 80).trim() : '' });
    }
    c.cases.forEach(k => { if ((k.co + k.title + k.story).toLowerCase().includes(t)) res.push({ title: `${k.co}: ${k.title}`, label: L('real life'), go: `/c/${c.id}/cases` }); });
    c.cards.forEach(([q, a]) => { if ((q + a).toLowerCase().includes(t)) res.push({ title: q, label: L('flashcard'), go: `/c/${c.id}/cards` }); });
    (c.tutorial?.items || []).forEach(x => { if ((x.q + stripHtml(x.a)).toLowerCase().includes(t)) res.push({ title: `${x.n} ${x.q.slice(0, 90)}`, label: L('tutorial'), go: `/c/${c.id}/tutorial` }); });
    c.code.forEach(k => { if ((k.title + k.explain).toLowerCase().includes(t)) res.push({ title: k.title, label: L('code'), go: `/c/${c.id}/code` }); });
  }
  skills.forEach(s => { if ((s.title + s.what + s.learn.join(' ')).toLowerCase().includes(t)) res.push({ title: s.title, label: 'SE essentials', go: `/skill/${s.id}` }); });
  return { results: res.slice(0, 60), total: res.length };
}
