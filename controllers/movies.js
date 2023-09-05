const Movie = require('../models/movie');
const ValidateError = require('../errors/ValidateError');
const NotFoundError = require('../errors/NotFoundError');
const ForbbidenError = require('../errors/ForbbidenError');
const { CREATED, OK } = require('../errors/index');
const { ERR_MOVIE_NO_EXISTS, ERR_DELETION_MOVIE } = require('../utils/error_name');

/* ----мидлвэр---- */
// Проверим, существует ли фильм по идентификатору:
const doesMovieIdExist = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(new NotFoundError(ERR_MOVIE_NO_EXISTS))
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

const createMovie = (req, res, next) => {
  const { _id } = req.user;

  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: _id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidateError(err.message));
        return;
      }
      next(err);
    });
};

const getMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((movies) => res.status(OK).send(movies))
    .catch((err) => next(err));
};

const deleteMovieByID = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;

  Movie.findById(movieId)
    .then((movie) => {
      if (movie.owner.toString() === _id) {
        movie.deleteOne(movie)
          .then(() => res.send(movie))
          .catch(next);
      } else next(new ForbbidenError(ERR_DELETION_MOVIE));
    })
    .catch((err) => next(err));
};

module.exports = {
  createMovie,
  getMovies,
  doesMovieIdExist,
  deleteMovieByID,
};
