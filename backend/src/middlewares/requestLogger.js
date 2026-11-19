// Prints "GET /api/chapters 200 3ms" for every request.
export function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`));
  next();
}
