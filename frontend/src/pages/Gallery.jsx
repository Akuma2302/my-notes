import TopBar from '../components/TopBar.jsx';
import Diagram from '../components/Diagram.jsx';
import SubjectTabs from '../components/SubjectTabs.jsx';
import { useSubject } from '../hooks/useSubject.js';

export default function Gallery() {
  const { subject, chapters } = useSubject();
  const count = chapters.reduce((s, c) => s + c.sections.reduce((a, x) => a + (x.pics || []).length, 0), 0);
  return (
    <>
      <TopBar title="Picture gallery" sub={`${count} diagrams · ${subject.short}`} />
      <SubjectTabs activeOnly />
      {chapters.map(c => (
        <div key={c.id}>
          <h2>Ch {c.num}: {c.title}</h2>
          {c.sections.flatMap(s => (s.pics || []).map(p => <Diagram key={p} name={p} caption={`${s.h} (Ch ${c.num})`} />))}
        </div>
      ))}
    </>
  );
}
