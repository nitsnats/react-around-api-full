class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;

// return next(new BadRequestError('Data format is incorrect'));// 400
