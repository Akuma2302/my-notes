// An error with an HTTP status, thrown anywhere and turned into JSON by errorHandler.
export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
  static badRequest(msg, details) { return new ApiError(400, msg, details); }
  static notFound(msg = 'Not found') { return new ApiError(404, msg); }
}
