import { CASE_THEME } from '../utils/constants.js';

export default function CaseCard({ item: k }) {
  return (
    <div className="case">
      <div className="head">
        <div className={'logo th-' + (CASE_THEME[k.color] || 'quality')}>{k.logo}</div>
        <div><b>{k.co}</b>{k.year && <div className="yr">{k.year}</div>}</div>
      </div>
      <div className="body">
        <b>{k.title}</b>
        <p>{k.story}</p>
        <div className="lesson"><b>Link to lecture:</b> {k.lesson}</div>
      </div>
    </div>
  );
}
