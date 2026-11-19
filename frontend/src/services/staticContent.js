// Only used by the offline phone build: the seed data compiled straight into the app.
// When you add a subject's chapters file, import it here too.
import chapters1 from '@seed/chapters-1-5.js';
import chapters2 from '@seed/chapters-6-10.js';
import { subjects } from '@seed/subjects.js';
import { skills, skillGroups } from '@seed/skills.js';
import { clusters } from '@seed/clusters.js';

const order = Object.fromEntries(subjects.map((s, i) => [s.id, i]));
const chapters = [...chapters1, ...chapters2].sort((a, b) => order[a.subject] - order[b.subject] || a.num - b.num);

export const staticContent = {
  subjects: subjects.map(s => ({ ...s, chapterCount: chapters.filter(c => c.subject === s.id).length })),
  chapters,
  skills,
  skillGroups,
  clusters
};
