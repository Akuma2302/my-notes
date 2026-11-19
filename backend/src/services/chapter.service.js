// Business logic for chapters and the links between lectures.
import { chapterRepository } from '../repositories/chapter.repository.js';
import { toChapter, toChapterSummary, toCluster } from '../models/chapter.model.js';
import { ApiError } from '../utils/ApiError.js';


const full = row => toChapter(row, chapterRepository.findParts(row.id));

export const chapterService = {
  list: ({ full: wantFull, subject } = {}) =>
    (subject ? chapterRepository.findBySubject(subject) : chapterRepository.findAll()).map(r => (wantFull ? full(r) : toChapterSummary(r))),

  getById(id) {
    const row = chapterRepository.findById(id);
    if (!row) throw ApiError.notFound(`Chapter ${id} not found`);
    return full(row);
  },

  // Undirected graph: one edge per chapter pair, with every shared topic.
  connections() {
    const rows = chapterRepository.findAll();
    const nums = Object.fromEntries(rows.map(r => [r.id, r.num]));
    const subj = Object.fromEntries(rows.map(r => [r.id, r.subject_id]));
    const edges = new Map();
    for (const l of chapterRepository.findAllLinks()) {
      const [a, b] = [nums[l.from_id], nums[l.to_id]].sort((x, y) => x - y);
      const subject = subj[l.from_id];
      const key = `${subject}:${a}-${b}`;
      if (!edges.has(key)) edges.set(key, { subject, a, b, topics: [] });
      const e = edges.get(key);
      if (!e.topics.includes(l.topic)) e.topics.push(l.topic);
    }
    return { edges: [...edges.values()], clusters: chapterService.clusters() };
  },

  clusters() {
    return chapterRepository.findClusters().map(toCluster);
  }
};
