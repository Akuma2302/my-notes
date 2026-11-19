// Lets controllers be async without try/catch: errors go to errorHandler.
export const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
