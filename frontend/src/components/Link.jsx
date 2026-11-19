// A button that moves to another page (hash route).
import { navigate } from '../hooks/useHashRoute.js';

export default function Link({ to, className, children, ...rest }) {
  return <button type="button" className={className} onClick={() => navigate(to)} {...rest}>{children}</button>;
}
