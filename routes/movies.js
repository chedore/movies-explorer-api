const router = require('express').Router();
const {
  validateCreateMovie,
  validateMovieId,
} = require('../middlewares/validation');
const {
  createMovie,
  getMovies,
  doesMovieIdExist,
  deleteMovieByID,
} = require('../controllers/movies');

// создаёт фильм с переданными в теле
router.post('/', validateCreateMovie, createMovie);

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovies);

// удаляет сохранённый фильм по id
router.delete('/:movieId', validateMovieId, doesMovieIdExist, deleteMovieByID);

module.exports = router;
