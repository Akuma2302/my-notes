// Runs a validator on req.params / req.query / req.body.
// A validator returns { value, errors }; errors stop the request with 400.
import { ApiError } from '../utils/ApiError.js';

export const validate = (validator, where = 'body') => (req, res, next) => {
  const { value, errors } = validator(req[where] || {});
  if (errors.length) return next(ApiError.badRequest('Invalid input', errors));
  req.valid = { ...(req.valid || {}), [where]: value };
  next();
};
