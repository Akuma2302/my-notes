// List of SE essentials topics, grouped (used on Home and the /se page).
import Icon from '../components/Icon.jsx';
import Link from '../components/Link.jsx';
import { useContent } from '../hooks/useContent.js';

export default function SkillList() {
  const { skills, skillGroups, chapters } = useContent();
  return (
    <>
      <div className="hero th-skill">
        <h1>Software engineering essentials</h1>
        <div style={{ fontSize: 13 }}>{skills.length} topics beyond the lecture, each linked to the SQA chapters that need it</div>
      </div>
      {skillGroups.map(g => (
        <div key={g.id}>
          <div className="lbl">{g.label}</div>
          {skills.filter(s => s.group === g.id).map(s => {
            const used = chapters.filter(c => c.beyond.some(b => b.skill === s.id));
            return (
              <Link key={s.id} to={`/skill/${s.id}`} className="row">
                <span className="num th-skill"><Icon name={s.icon} /></span>
                <span className="grow"><b>{s.title}</b><small>{s.level} · used in {used.map(c => 'Ch ' + c.num).join(', ') || 'general'}</small></span>
                <Icon name="chev" />
              </Link>
            );
          })}
        </div>
      ))}
    </>
  );
}
