import Icon from '../components/Icon.jsx';
import Link from '../components/Link.jsx';

const ITEMS = [['home', 'Home', '/'], ['book', 'Subjects', '/subjects'], ['graph', 'Connect', '/connect'], ['cards', 'Practice', '/practice'], ['sticky', 'Notes', '/notes'], ['user', 'Me', '/me']];

export default function BottomNav({ active }) {
  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-in">
        {ITEMS.map(([icon, label, to]) => (
          <Link key={label} to={to} className={active === label ? 'on' : ''} aria-current={active === label ? 'page' : undefined}>
            <Icon name={icon} /><span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
