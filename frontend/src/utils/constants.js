export const CHAPTER_TABS = [
  ['note', 'Note'], ['map', 'Mind map'], ['links', 'Links'], ['cases', 'Real life'], ['code', 'Code'],
  ['beyond', 'Beyond lecture'], ['cards', 'Cards'], ['quiz', 'Quiz']
];

// Tabs a chapter shows: the shared ones, plus Tutorial and Calculator when it has them.
export const chapterTabs = c => {
  const t = c.tutorial ? [...CHAPTER_TABS.slice(0, 6), ['tutorial', 'Tutorial'], ...CHAPTER_TABS.slice(6)] : CHAPTER_TABS;
  return c.tool ? [...t, ['tools', 'Calculator']] : t;
};
export const tabCount = c => chapterTabs(c).length;

export const CASE_THEME = { r: 'control', c: 'control', p: 'quality', t: 'reliability', a: 'skill', g: 'reliability', x: 'skill' };

export const FP_WEIGHTS = [
  ['inputs', 'User inputs', [3, 4, 6]], ['outputs', 'User outputs', [4, 5, 7]], ['queries', 'Online queries', [3, 4, 6]],
  ['files', 'Logical files', [7, 10, 15]], ['interfaces', 'External interfaces', [5, 7, 10]]
];
export const FP_DEFAULTS = { inputs: [1, 1, 0], outputs: [0, 2, 1], queries: [1, 0, 0], files: [1, 1, 0], interfaces: [0, 0, 1] };

export const MAP_COLORS = ['a', 'p', 't', 'c', 'g'];
