import Icon from './Icon.jsx';
import Link from './Link.jsx';

export default function Tile({ icon, title, sub, to, dark }) {
  return <Link to={to} className={'tile' + (dark ? ' dark' : '')}><Icon name={icon} /><b>{title}</b><small>{sub}</small></Link>;
}
