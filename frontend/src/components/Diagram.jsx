// One of the built-in pictures, with a zoom button.
import { useState } from 'react';
import D from '../utils/diagrams.js';

export default function Diagram({ name, caption, svg }) {
  const [big, setBig] = useState(false);
  const markup = svg || (D.special[name] ? D.special[name]() : '');
  if (!markup) return null;
  const title = caption || (markup.match(/<title>(.*?)<\/title>/) || [])[1];
  return (
    <figure className="pic">
      <div className={'zoomwrap' + (big ? ' big' : '')} dangerouslySetInnerHTML={{ __html: markup }} />
      <figcaption>{title} · <button className="zbtn" onClick={() => setBig(b => !b)}>{big ? 'Fit screen' : 'Zoom'}</button></figcaption>
    </figure>
  );
}
