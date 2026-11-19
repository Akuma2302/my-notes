import TopBar from '../components/TopBar.jsx';
import Link from '../components/Link.jsx';

export default function NotFound() {
  return <><TopBar title="Not found" /><div className="empty">That page does not exist. <Link to="/" className="btn">Go home</Link></div></>;
}
