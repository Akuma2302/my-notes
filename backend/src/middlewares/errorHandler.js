// Central error handler: every error becomes { error: { message, details } }.
import { config } from '../config/index.js';

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({
    error: {
      message: status >= 500 && config.env === 'production' ? 'Something went wrong' : err.message,
      ...(err.details ? { details: err.details } : {})
    }
  });
}
