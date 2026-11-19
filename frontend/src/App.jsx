// Picks the page for the current #/route and wraps it in the layout.
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProgress } from './redux/progressSlice.js';
import { session } from './utils/storage.js';
import AppLayout from './layout/AppLayout.jsx';
import StatusScreen from './components/StatusScreen.jsx';
import { useContent } from './hooks/useContent.js';
import { useHashRoute } from './hooks/useHashRoute.js';
import Home from './pages/Home.jsx';
import Subjects from './pages/Subjects.jsx';
import Subject from './pages/Subject.jsx';
import Chapter from './pages/Chapter.jsx';
import Connect from './pages/Connect.jsx';
import BigMap from './pages/BigMap.jsx';
import Gallery from './pages/Gallery.jsx';
import Cases from './pages/Cases.jsx';
import Practice from './pages/Practice.jsx';
import Cards from './pages/Cards.jsx';
import QuizPage from './pages/QuizPage.jsx';
import Tools from './pages/Tools.jsx';
import Me from './pages/Me.jsx';
import Welcome from './pages/Welcome.jsx';
import Search from './pages/Search.jsx';
import Skills from './pages/Skills.jsx';
import Skill from './pages/Skill.jsx';
import NotFound from './pages/NotFound.jsx';

function pick({ parts, params }) {
  const [first, a, b] = parts;
  switch (first) {
    case undefined: return { element: <Home />, nav: 'Home' };
    case 'subjects':
    case 'chapters': return { element: <Subjects />, nav: 'Subjects' };
    case 's': return { element: <Subject id={a} />, nav: 'Subjects' };
    case 'c': return { element: <Chapter id={a} tab={b} />, nav: 'Subjects' };
    case 'connect': return { element: <Connect selected={Number(params.get('sel')) || null} />, nav: 'Connect' };
    case 'bigmap': return { element: <BigMap />, nav: 'Connect' };
    case 'gallery': return { element: <Gallery />, nav: 'Practice' };
    case 'cases': return { element: <Cases />, nav: 'Practice' };
    case 'practice': return { element: <Practice />, nav: 'Practice' };
    case 'cards': return { element: <Cards />, nav: 'Practice' };
    case 'quiz': return { element: <QuizPage />, nav: 'Practice' };
    case 'tools': return { element: <Tools />, nav: 'Practice' };
    case 'me':
    case 'saved': return { element: <Me />, nav: 'Me' };
    case 'search': return { element: <Search initial={params.get('q') || ''} />, nav: 'Home' };
    case 'se': return { element: <Skills />, nav: 'Home' };
    case 'skill': return { element: <Skill id={a} />, nav: 'Home' };
    default: return { element: <NotFound />, nav: 'Home' };
  }
}

export default function App() {
  const content = useContent();
  const route = useHashRoute();
  const { onboarded } = useSelector(selectProgress);
  // Welcome shows once per app launch: sessionStorage survives page changes and refresh, not closing the app.
  const [welcomed, setWelcomed] = useState(() => session.get('welcomed', false));
  const doneWelcome = () => { session.set('welcomed', true); setWelcomed(true); };
  const page = route.parts.slice(0, 2).join('/');
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  if (content.status === 'loading') return <StatusScreen title="Loading your notes…" />;
  if (content.status === 'error') {
    return (
      <StatusScreen title="Can't reach the server">
        <p>Start the backend (cd backend, then npm run dev) and reload. Error: {content.error.message}</p>
        <button className="btn pri" onClick={() => location.reload()}>Try again</button>
      </StatusScreen>
    );
  }
  if (!onboarded || !welcomed) return <Welcome onDone={doneWelcome} />;
  const { element, nav } = pick(route);
  return <AppLayout key={page} nav={nav}>{element}</AppLayout>;
}
