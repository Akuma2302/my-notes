import { useEffect, useRef } from 'react';

export default function Tabs({ items, active, onPick, sticky }) {
  const ref = useRef(null);
  // Keep the active tab visible when the row scrolls sideways.
  useEffect(() => {
    const el = ref.current?.querySelector('.tab.on');
    if (el) ref.current.scrollTo({ left: el.offsetLeft - ref.current.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [active]);
  return (
    <div ref={ref} className={'tabs' + (sticky ? ' sticky-tabs' : '')} role="tablist">
      {items.map(([key, label]) => (
        <button key={key} role="tab" aria-selected={active === key} className={'tab' + (active === key ? ' on' : '')} onClick={() => onPick(key)}>{label}</button>
      ))}
    </div>
  );
}
