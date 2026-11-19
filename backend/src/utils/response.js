// Same response shape everywhere: { data } or { data, meta }.
export const ok = (res, data, meta) => res.json(meta ? { data, meta } : { data });
export const created = (res, data) => res.status(201).json({ data });
