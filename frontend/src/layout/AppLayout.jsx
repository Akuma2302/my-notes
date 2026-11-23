// Page frame: content area (with its sticky notes) plus the bottom navigation bar.
import BottomNav from './BottomNav.jsx';
import NotesLayer from '../features/notes/NotesLayer.jsx';

export default function AppLayout({ nav, children }) {
  return (
    <>
      <main id="app" className="fade">
        {children}
        <NotesLayer />
      </main>
      <BottomNav active={nav} />
    </>
  );
}
