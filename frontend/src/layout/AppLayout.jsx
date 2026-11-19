// Page frame: content area plus the bottom navigation bar.
import BottomNav from './BottomNav.jsx';

export default function AppLayout({ nav, children }) {
  return (
    <>
      <main id="app" className="fade">{children}</main>
      <BottomNav active={nav} />
    </>
  );
}
