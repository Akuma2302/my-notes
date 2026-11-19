// Tiny syntax highlighter for the code examples. Returns safe HTML.
import { esc } from './html.js';

const KW = new Set(('def return if elif else for while in import from class try except raise with as assert not and or is None True False lambda ' +
  'public private static final void new throw throws interface implements extends const let var function long short int double boolean ' +
  'SELECT FROM WHERE JOIN ON GROUP BY HAVING ORDER DESC UPDATE SET INSERT INTO VALUES BEGIN TRANSACTION COMMIT ROLLBACK AS AVG ' +
  'Feature Scenario Given When Then And WORKDIR COPY RUN CMD name on jobs steps uses').split(' '));
const HASH_COMMENT = new Set(['Shell', 'Python', 'YAML', 'Dockerfile']);
const TOKENS = /(#[^\n]*|\/\/[^\n]*|--[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\n]|\.)*"|'(?:[^'\\n]|\.)*')|(\b\d[\d_.]*\b)|([A-Za-z_][A-Za-z0-9_]*)(?=\s*\()|([A-Za-z_]+)|([\s\S])/g;

export function highlight(src, lang) {
  if (lang === 'Text' || lang === 'Markdown') return esc(src);
  let out = '';
  for (const m of src.matchAll(TOKENS)) {
    const [, comment, str, num, fn, word, other] = m;
    if (comment) {
      const isComment = comment.startsWith('//') || comment.startsWith('/*') || (comment.startsWith('#') && HASH_COMMENT.has(lang)) || (comment.startsWith('--') && lang === 'SQL');
      out += isComment ? `<span class="c">${esc(comment)}</span>` : esc(comment);
    } else if (str) out += `<span class="s">${esc(str)}</span>`;
    else if (num) out += `<span class="n">${esc(num)}</span>`;
    else if (fn) out += KW.has(fn) ? `<span class="k">${esc(fn)}</span>` : `<span class="f">${esc(fn)}</span>`;
    else if (word) out += KW.has(word) ? `<span class="k">${esc(word)}</span>` : esc(word);
    else out += esc(other);
  }
  return out;
}
