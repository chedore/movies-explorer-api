const { UNAUTHORIZED } = require('./index');

class BadUnAutorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = BadUnAutorized;
