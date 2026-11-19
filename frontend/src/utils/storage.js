// localStorage that never crashes (private mode, blocked storage).
const PREFIX = 'sqa.';
export const storage = {
  get(key, fallback) {
    try { const v = localStorage.getItem(PREFIX + key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch { /* storage unavailable */ }
  }
};
