// An SE essentials topic shown under a chapter, with why it connects.
import Icon from './Icon.jsx';
import Link from './Link.jsx';
import CodeBlock from './CodeBlock.jsx';

export default function SkillCard({ skill: s, why, chapter }) {
  if (!s) return null;
  return (
    <div className="skill">
      <div className="sh">
        <span className="num th-skill"><Icon name={s.icon} /></span>
        <div className="grow"><b>{s.title}</b><br /><small style={{ color: 'var(--muted)' }}>{s.group} · {s.level}</small></div>
      </div>
      <p className="why2"><b>Why with {chapter ? `Ch ${chapter.num}` : 'your studies'}:</b> {why}</p>
      <details>
        <summary>What to learn and example</summary>
        <ul>{s.learn.map(x => <li key={x}>{x}</li>)}</ul>
        <div className="pill-row">{s.tools.map(t => <span key={t} className="chip th-skill">{t}</span>)}</div>
        <p><b>{s.real.co}:</b> {s.real.text}</p>
        {s.code && <CodeBlock src={s.code.src} lang={s.code.lang} />}
        <Link to={`/skill/${s.id}`} className="btn" style={{ width: '100%', marginTop: 8 }}>Open full topic</Link>
      </details>
    </div>
  );
}
