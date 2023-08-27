const { FORBIDDEN } = require('./index');

class ForbbidenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = ForbbidenError;
