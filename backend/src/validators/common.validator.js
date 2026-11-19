// Ids are short lowercase slugs: chapters 'ch1' or 'dcs1', subjects 'sqa', skills 'git'.
const SLUG = /^[a-z][a-z0-9-]{1,29}$/;
const slugError = (field, label) => ({ field, message: `${label} must be 2-30 lowercase letters, numbers or dashes` });

export function chapterIdParam({ id }) {
  return { value: { id }, errors: SLUG.test(String(id)) ? [] : [slugError('id', 'Chapter id')] };
}

export function subjectIdParam({ id }) {
  return { value: { id }, errors: SLUG.test(String(id)) ? [] : [slugError('id', 'Subject id')] };
}

export function skillIdParam({ id }) {
  return { value: { id }, errors: SLUG.test(String(id)) ? [] : [slugError('id', 'Skill id')] };
}

// ?chapter=ch3 and/or ?subject=sqa
export function chapterFilterQuery({ chapter, subject }) {
  const errors = [];
  if (chapter !== undefined && !SLUG.test(String(chapter))) errors.push(slugError('chapter', 'chapter'));
  if (subject !== undefined && !SLUG.test(String(subject))) errors.push(slugError('subject', 'subject'));
  return { value: { chapter, subject }, errors };
}

// ?full=true&subject=sqa
export function chapterListQuery({ full, subject }) {
  const errors = [];
  if (subject !== undefined && !SLUG.test(String(subject))) errors.push(slugError('subject', 'subject'));
  return { value: { full: full === 'true' || full === '1', subject }, errors };
}
