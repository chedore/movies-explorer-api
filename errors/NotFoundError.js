const { NOT_FOUND } = require('./index');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundError;
