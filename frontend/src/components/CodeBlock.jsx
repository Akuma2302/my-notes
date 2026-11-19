import { useMemo, useState } from 'react';
import { highlight } from '../utils/highlight.js';

export default function CodeBlock({ src, lang }) {
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => highlight(src, lang), [src, lang]);
  const copy = () => {
    navigator.clipboard?.writeText(src).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1200); }).catch(() => {});
  };
  return (
    <>
      <div className="codehead"><span className="lang">{lang}</span><button className="copy" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button></div>
      <pre><code dangerouslySetInnerHTML={{ __html: html }} /></pre>
    </>
  );
}
