import TopBar from '../components/TopBar.jsx';
import MindMap from '../components/MindMap.jsx';
import SubjectTabs from '../components/SubjectTabs.jsx';
import { useContent } from '../hooks/useContent.js';
import { useSubject } from '../hooks/useSubject.js';
import { skillMap } from '../utils/maps.js';

export default function BigMap() {
  const { skills } = useContent();
  const { subject, chapters, theme } = useSubject();
  const whole = { center: subject.short, branches: chapters.map(c => ({ label: `Ch ${c.num} ${c.short}`, color: theme(c.theme).c, kids: c.mindmaps[0].branches.slice(0, 4).map(b => b.label) })) };
  return (
    <>
      <TopBar title="Big mind map" sub={`${subject.title} on one page`} />
      <SubjectTabs activeOnly />
      {chapters.length > 0 && <MindMap map={whole} caption={`Whole subject: ${subject.short}`} />}
      <h2>Every chapter mind map</h2>
      {chapters.flatMap(c => c.mindmaps.map((m, i) => <MindMap key={c.id + i} map={m} caption={`Ch ${c.num} · map ${i + 1}: ${m.center}`} />))}
      <h2>SE essentials mind maps</h2>
      {skills.map(s => <MindMap key={s.id} map={skillMap(s)} caption={s.title} />)}
    </>
  );
}
