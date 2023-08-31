/* eslint-disable object-curly-newline */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidateError = require('../errors/ValidateError');
const NotFoundError = require('../errors/NotFoundError');
const { OK, CREATED, CONFLICT } = require('../errors/index');

/* ----мидлвэр---- */
// Проверим, существует ли пользователь:

// Проверим, существует ли наш рользователь:
const doesMeExist = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then(() => {
      next();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidateError(err.message));
        return;
      }
      next(err);
    });
};

//-------------------

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

const getUserProfile = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => res.status(OK).send(user))
    .catch((err) => next(err));
};

const updateUserProfile = (req, res, next) => {
  // перед updateUserProfile проверяется мидлвэр doesMeExist
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidateError(err.message));
        return;
      }
      next(err);
    });
};

module.exports = {
  createUser,
  login,
  doesMeExist,
  getUserProfile,
  updateUserProfile,
};
