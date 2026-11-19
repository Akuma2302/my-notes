import Icon from './Icon.jsx';
import Link from './Link.jsx';
import { useContent } from '../hooks/useContent.js';

export default function LinkBox({ from, to, topic, text, openTab = '' }) {
  const { subjectById } = useContent();
  const other = from.subject !== to.subject;           // link to another subject
  const label = c => (other ? `${subjectById[c.subject]?.short} Ch ${c.num}` : `Ch ${c.num}`);
  return (
    <div className="linkbox">
      <b><Icon name="link" /> {other ? 'Linked subject' : 'Linked'}: {topic}</b> · {label(from)} ↔ {label(to)}<br />
      {text}<br />
      <Link to={`/c/${to.id}${openTab}`}>Open {label(to)}: {to.short}</Link>
    </div>
  );
}
