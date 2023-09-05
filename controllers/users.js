const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidateError = require('../errors/ValidateError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { OK, CREATED } = require('../errors/index');
const { JWT_SECRET, NODE_ENV } = require('../utils/constant');
const { ERR_USER_NO_EXISTS, ERR_EMAIL_EXISTS } = require('../utils/error_name');

/* ----мидлвэр---- */
// Проверим, существует ли наш рользователь:
const doesMeExist = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(new NotFoundError(ERR_USER_NO_EXISTS))
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
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidateError(err.message));
        return;
      } if (err.code === 11000) {
        next(new ConflictError(ERR_EMAIL_EXISTS));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
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
  const { name, email } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, email },
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
