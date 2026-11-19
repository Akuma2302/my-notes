// Only used by the offline phone build: the seed data compiled straight into the app.
// Every database/seeds/data/chapters-*.js file is picked up automatically.
import { subjects } from '@seed/subjects.js';
import { skills, skillGroups } from '@seed/skills.js';
import { clusters } from '@seed/clusters.js';

const order = Object.fromEntries(subjects.map((s, i) => [s.id, i]));
const files = import.meta.glob('../../../database/seeds/data/chapters-*.js', { eager: true, import: 'default' });
const chapters = Object.values(files).flat().sort((a, b) => order[a.subject] - order[b.subject] || a.num - b.num);

export const staticContent = {
  subjects: subjects.map(s => ({ ...s, chapterCount: chapters.filter(c => c.subject === s.id).length })),
  chapters,
  skills,
  skillGroups,
  clusters
};
