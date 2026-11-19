// Subject tabs: one pill per subject (+ optional SE essentials). Coming-soon subjects show a dot.
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from './Icon.jsx';
import { useContent } from '../hooks/useContent.js';
import { selectSubject, setSubject } from '../redux/progressSlice.js';

export default function SubjectTabs({ withSkills = false, activeOnly = false, value, onPick }) {
  const { subjects } = useContent();
  const picked = useSelector(selectSubject);
  const dispatch = useDispatch();
  const fallback = subjects.find(s => s.status === 'active')?.id;
  const active = value ?? (activeOnly && subjects.find(s => s.id === picked)?.status !== 'active' ? fallback : picked);
  const pick = id => (onPick ? onPick(id) : dispatch(setSubject(id)));
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current?.querySelector('.tab.on');
    if (el) ref.current.scrollTo({ left: el.offsetLeft - ref.current.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [active]);
  const list = activeOnly ? subjects.filter(s => s.status === 'active') : subjects;
  if (activeOnly && list.length < 2) return null;   // nothing to choose yet
  return (
    <div ref={ref} className="tabs subject-tabs" role="tablist" aria-label="Subjects">
      {list.map(s => (
        <button key={s.id} role="tab" aria-selected={active === s.id} className={'tab' + (active === s.id ? ' on' : '')} onClick={() => pick(s.id)}>
          <Icon name={s.status === 'active' ? 'book' : 'calendar'} />{s.short}{s.status !== 'active' && <span className="soon">soon</span>}
        </button>
      ))}
      {withSkills && (
        <button role="tab" aria-selected={active === 'se'} className={'tab' + (active === 'se' ? ' on' : '')} onClick={() => pick('se')}><Icon name="star" />SE essentials</button>
      )}
    </div>
  );
}
