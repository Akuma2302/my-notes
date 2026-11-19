// A mind map. Opens wide (scroll sideways) and centred, with a fit-screen toggle.
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import D from '../utils/diagrams.js';

export default function MindMap({ map, caption }) {
  const [big, setBig] = useState(true);
  const ref = useRef(null);
  const markup = useMemo(() => D.mindmap(map), [map]);
  useLayoutEffect(() => {
    const w = ref.current;
    if (w && big) w.scrollLeft = (w.scrollWidth - w.clientWidth) / 2;
  }, [big, markup]);
  return (
    <figure className="pic">
      <div ref={ref} className={'zoomwrap' + (big ? ' big' : '')} dangerouslySetInnerHTML={{ __html: markup }} />
      <figcaption>{caption || 'Mind map'} · {big ? 'scroll sideways · ' : ''}<button className="zbtn" onClick={() => setBig(b => !b)}>{big ? 'Fit screen' : 'Zoom'}</button></figcaption>
    </figure>
  );
}
