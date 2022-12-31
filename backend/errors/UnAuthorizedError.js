class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnAuthorizedError;

// return next(new UnAuthorizedError(err.message));// 401
