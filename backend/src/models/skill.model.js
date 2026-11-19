import { parseJson } from '../utils/text.js';

export const toSkill = row => ({
  id: row.id, group: row.group_id, title: row.title, icon: row.icon, level: row.level, what: row.what,
  learn: parseJson(row.learn), tools: parseJson(row.tools),
  real: { co: row.real_company, text: row.real_text },
  ...(row.code_source ? { code: { lang: row.code_lang, src: row.code_source } } : {}),
  map: parseJson(row.mindmap)
});

export const toSkillGroup = row => ({ id: row.id, label: row.label });
