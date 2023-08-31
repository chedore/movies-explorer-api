/* eslint-disable object-curly-newline */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidateError = require('../errors/ValidateError');
const { OK, CREATED, CONFLICT } = require('../errors/index');

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    // eslint-disable-next-line max-len
    .then((user) => res.status(CREATED).send({ _id: user._id, email: user.email, name: user.name, about: user.about, avatar: user.avatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidateError(err.message));
        return;
      } if (err.code === 11000) {
        res.status(CONFLICT).send({ message: 'Данный email уже существует' });
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(OK).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createUser,
  login,
};
