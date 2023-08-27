const { BAD_REQUEST } = require('./index');

class ValidateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = ValidateError;
