// Subjects shown as tabs on Home. Chapters live in data/chapters-*.js (loaded automatically)
// with subject: '<id>' and ids like 'ob1', 'plt1', 'dcs1'. A subject with no notes yet uses
// status: 'coming_soon'.
export const subjects = [
  {
    id: 'sqa', code: 'CSE6314', status: 'active',
    title: 'Software Reliability and Quality Assurance', short: 'Software QA',
    description: 'Quality factors, SQA, reviews, reliability, metrics, V&V, TQM and risk.',
    themes: { quality: 'Quality ideas', reliability: 'Reliability', control: 'Control and measurement' }
  },
  {
    id: 'ob', code: '', status: 'active',
    title: 'Organisational Behaviour', short: 'Org Behaviour',
    description: 'People at work: personality, perception, motivation, teams, power, conflict, leadership, culture and change. 13 topics with tutorials.',
    themes: { individual: 'Individual behaviour', team: 'Teams and people', org: 'Leading the organisation' }
  },
  {
    id: 'plt', code: 'TCS3311', status: 'active',
    title: 'Programming Language Translation', short: 'Prog Lang Translation',
    description: 'Compiler design: scanning, parsing, translation, optimisation and code generation. 12 topics with tutorials.',
    themes: { front: 'Front end: scan and parse', middle: 'Meaning and translation', back: 'Back end: optimise and generate' }
  },
  {
    id: 'dcs', code: '', status: 'active',
    title: 'Database and Cloud Security', short: 'DB & Cloud Security',
    description: 'Securing SQL Server and cloud data: threat modelling, compliance and more. Lecture 1 so far.',
    themes: { threats: 'Threats and compliance', access: 'Access control', protect: 'Data protection' }
  }
];
