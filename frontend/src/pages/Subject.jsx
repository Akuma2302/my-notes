// One subject: hero, theme legend, and its chapters as course cards.
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '../components/TopBar.jsx';
import CourseCard from '../components/CourseCard.jsx';
import ComingSoon from '../components/ComingSoon.jsx';
import NotFound from './NotFound.jsx';
import { useContent } from '../hooks/useContent.js';
import { chapterProgress, selectVisited, setSubject } from '../redux/progressSlice.js';
import { tabCount } from '../utils/constants.js';
import { themeStyle } from '../utils/themes.js';

export default function Subject({ id }) {
  const { subjectById, chaptersOf } = useContent();
  const s = subjectById[id];
  const visited = useSelector(selectVisited);
  const dispatch = useDispatch();
  useEffect(() => { if (s) dispatch(setSubject(s.id)); }, [s, dispatch]);   // practice pages follow this subject
  if (!s) return <NotFound />;
  const list = chaptersOf(s.id);
  const tabs = c => tabCount(c);
  return (
    <>
      <TopBar title={s.title} sub={s.status === 'active' ? `${s.code} · ${list.length} chapters` : 'Coming soon'} />
      {s.status !== 'active' ? <ComingSoon subject={s} /> : (
        <>
          <div className="pill-row">{Object.keys(s.themes).map(t => { const th = themeStyle(t, s); return <span key={t} className={'chip ' + th.cls}>{th.name}</span>; })}</div>
          {list.map((c, i) => <CourseCard key={c.id} chapter={c} done={chapterProgress(visited, c, tabs(c))} total={tabs(c)} dark={i % 2 === 0} />)}
        </>
      )}
    </>
  );
}
