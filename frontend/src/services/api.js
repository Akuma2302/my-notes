// Small fetch wrapper for the backend. Throws an Error with the API's message.
const BASE = import.meta.env.VITE_API_URL || '/api';

export async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(BASE + path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined
  });
  if (res.status === 204) return null;
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(json.error?.message || `Request failed (${res.status})`);
    err.details = json.error?.details;
    throw err;
  }
  return json;
}
