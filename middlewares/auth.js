const jwt = require('jsonwebtoken');
const BadUnAutorized = require('../errors/BadUnAutorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new BadUnAutorized('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new BadUnAutorized('Необходима авторизация'));
    return;
  }
  req.user = payload;

  next();
};

module.exports = auth;
