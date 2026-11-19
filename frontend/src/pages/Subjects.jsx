// All subjects as big cards (bottom nav "Subjects").
import { useSelector } from 'react-redux';
import TopBar from '../components/TopBar.jsx';
import SubjectCard from '../components/SubjectCard.jsx';
import { useContent } from '../hooks/useContent.js';
import { chapterProgress, selectVisited } from '../redux/progressSlice.js';
import { CHAPTER_TABS } from '../utils/constants.js';

export default function Subjects() {
  const { subjects, chaptersOf } = useContent();
  const visited = useSelector(selectVisited);
  const tabs = c => CHAPTER_TABS.length + (c.tool ? 1 : 0);
  return (
    <>
      <TopBar title="Subjects" sub={`${subjects.length} subjects · tap one to see its chapters`} back={false} />
      {subjects.map((s, i) => {
        const list = chaptersOf(s.id);
        return <SubjectCard key={s.id} subject={s} dark={i % 2 === 0}
          done={list.reduce((n, c) => n + chapterProgress(visited, c, tabs(c)), 0)} total={list.reduce((n, c) => n + tabs(c), 0)} />;
      })}
    </>
  );
}
