// Subjects shown as tabs on Home. To add notes for a subject later:
//   1. set its status to 'active' (and fill in its code),
//   2. add a chapters file (e.g. chapters-dcs.js) whose chapters have subject: '<id>'
//      and ids like 'dcs1', 'dcs2'…,
//   3. import that file in seeds/seed.js and frontend/src/services/staticContent.js.
export const subjects = [
  {
    id: 'sqa', code: 'CSE6314', status: 'active',
    title: 'Software Reliability and Quality Assurance', short: 'Software QA',
    description: 'Quality factors, SQA, reviews, reliability, metrics, V&V, TQM and risk.',
    themes: { quality: 'Quality ideas', reliability: 'Reliability', control: 'Control and measurement' }
  },
  {
    id: 'dcs', code: '', status: 'coming_soon',
    title: 'Database and Cloud Security', short: 'DB & Cloud Security',
    description: 'Notes coming soon. Add your lecture PDFs to build this subject.',
    themes: {}
  },
  {
    id: 'ob', code: '', status: 'coming_soon',
    title: 'Organisational Behaviour', short: 'Org Behaviour',
    description: 'Notes coming soon. Add your lecture PDFs to build this subject.',
    themes: {}
  },
  {
    id: 'plt', code: '', status: 'coming_soon',
    title: 'Programming Language Translation', short: 'Prog Lang Translation',
    description: 'Notes coming soon. Add your lecture PDFs to build this subject.',
    themes: {}
  }
];
