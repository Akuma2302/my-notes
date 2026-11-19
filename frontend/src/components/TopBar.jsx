import Icon from './Icon.jsx';
import { goBack } from '../hooks/useHashRoute.js';

export default function TopBar({ title, sub, back = true, children }) {
  return (
    <div className="top">
      {back && <button className="icon-btn" onClick={goBack} aria-label="Back"><Icon name="back" /></button>}
      <div className="ttl"><h1>{title}</h1>{sub && <small>{sub}</small>}</div>
      {children}
    </div>
  );
}
