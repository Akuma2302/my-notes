import TopBar from '../components/TopBar.jsx';
import CaseCard from '../components/CaseCard.jsx';
import SubjectTabs from '../components/SubjectTabs.jsx';
import { useSubject } from '../hooks/useSubject.js';

export default function Cases() {
  const { subject, chapters, theme } = useSubject();
  return (
    <>
      <TopBar title="Company cases" sub={`Real-life examples · ${subject.short}`} />
      <SubjectTabs activeOnly />
      {chapters.map(c => (
        <div key={c.id}>
          <h2><span className={'chip ' + theme(c.theme).cls}>Ch {c.num}</span> {c.title}</h2>
          {c.cases.map(k => <CaseCard key={k.co} item={k} />)}
        </div>
      ))}
    </>
  );
}
