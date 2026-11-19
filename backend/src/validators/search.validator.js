export function searchQuery({ q }) {
  const errors = [];
  const text = String(q ?? '').trim();
  if (text.length < 2) errors.push({ field: 'q', message: 'Search text must be at least 2 characters' });
  if (text.length > 100) errors.push({ field: 'q', message: 'Search text must be at most 100 characters' });
  return { value: { q: text }, errors };
}
