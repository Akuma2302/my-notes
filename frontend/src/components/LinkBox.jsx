import Icon from './Icon.jsx';
import Link from './Link.jsx';

export default function LinkBox({ from, to, topic, text, openTab = '' }) {
  return (
    <div className="linkbox">
      <b><Icon name="link" /> Linked: {topic}</b> · Ch {from.num} ↔ Ch {to.num}<br />
      {text}<br />
      <Link to={`/c/${to.id}${openTab}`}>Open Ch {to.num}: {to.short}</Link>
    </div>
  );
}
