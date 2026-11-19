// Which other lectures share topics with this chapter (both directions).
import D from '../../utils/diagrams.js';
import { esc } from '../../utils/html.js';
import Diagram from '../../components/Diagram.jsx';
import LinkBox from '../../components/LinkBox.jsx';
import Link from '../../components/Link.jsx';
import { useContent } from '../../hooks/useContent.js';
import { useChapterTheme } from '../../hooks/useSubject.js';

function linksSvg(c, chapterById, themeOf) {
  const others = c.links.map(l => chapterById[l.to]);
  const cx = 180, cy = 150, R = 110;
  let b = '';
  others.forEach((o, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / others.length, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
    b += D.line(cx, cy, x, y, false) + `<g class="n-${themeOf(o).c}"><circle cx="${x}" cy="${y}" r="30" stroke-width="1.2"/><text x="${x}" y="${y - 6}" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="700">Ch ${o.num}</text><text x="${x}" y="${y + 9}" text-anchor="middle" dominant-baseline="central" font-size="9">${esc(c.links[i].topic.slice(0, 14))}</text></g>`;
  });
  b += `<g class="n-b"><circle cx="${cx}" cy="${cy}" r="38" stroke-width="1.6"/><text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="700">Ch ${c.num}</text></g>`;
  return D.svg(360, 300, b, `How Ch ${c.num} connects to other lectures`);
}

export default function LinksTab({ chapter: c }) {
  const { chapters, chapterById } = useContent();
  const themeOf = useChapterTheme();
  const back = chapters.filter(o => o.id !== c.id && o.links.some(l => l.to === c.id));
  return (
    <>
      <p>Topics in this chapter that also appear in other lectures:</p>
      <Diagram svg={linksSvg(c, chapterById, themeOf)} />
      {c.links.map(l => <LinkBox key={l.to + l.topic} from={c} to={chapterById[l.to]} topic={l.topic} text={l.text} />)}
      {back.length > 0 && <div className="lbl">Other chapters that point here</div>}
      {back.flatMap(o => o.links.filter(l => l.to === c.id).map(l => (
        <div className="linkbox" key={o.id + l.topic}>
          <b>Ch {o.num} → Ch {c.num}: {l.topic}</b><br />{l.text}<br />
          <Link to={`/c/${o.id}`}>Open Ch {o.num}</Link>
        </div>
      )))}
    </>
  );
}
