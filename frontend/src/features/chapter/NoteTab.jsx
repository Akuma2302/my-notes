// The lecture notes, with pictures and "linked" boxes spread through the sections.
import Diagram from '../../components/Diagram.jsx';
import LinkBox from '../../components/LinkBox.jsx';
import Link from '../../components/Link.jsx';
import Icon from '../../components/Icon.jsx';
import { useContent } from '../../hooks/useContent.js';

export default function NoteTab({ chapter: c }) {
  const { chaptersOf, chapterById } = useContent();
  const chapters = chaptersOf(c.subject);
  const i = chapters.indexOf(c), prev = chapters[i - 1], next = chapters[i + 1];
  return (
    <>
      <div className="lbl">Contents</div>
      <div className="toc">
        {c.sections.map((s, n) => (
          <button key={s.h} className="row" onClick={() => document.getElementById(`sec-${n}`)?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="grow"><b>{s.h}</b><small>{(s.pics || []).length} picture{(s.pics || []).length === 1 ? '' : 's'}</small></span>
            <span className="playdot"><Icon name="chev" /></span>
          </button>
        ))}
      </div>
      {c.sections.map((s, n) => (
        <section key={s.h} id={`sec-${n}`} style={{ scrollMarginTop: 70 }}>
          <h2>{n + 1}. {s.h} <span className="src">Ch {c.num}</span></h2>
          {(s.pics || []).map(p => <Diagram key={p} name={p} />)}
          <div dangerouslySetInnerHTML={{ __html: s.body }} />
          {c.links.filter((_, j) => j % c.sections.length === n).map(l => (
            <LinkBox key={l.to + l.topic} from={c} to={chapterById[l.to]} topic={l.topic} text={l.text} />
          ))}
        </section>
      ))}
      <div className="btns">
        {prev && <Link to={`/c/${prev.id}`} className="btn">← Ch {prev.num}</Link>}
        {next && <Link to={`/c/${next.id}`} className="btn pri">Ch {next.num} →</Link>}
      </div>
    </>
  );
}
