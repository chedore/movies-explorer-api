const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const userRouters = require('./users');
const { createUser, login } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

// создаёт пользователя с переданными в теле
// email, password и name
router.post('/signup', validateCreateUser, createUser);

// проверяет переданные в теле почту и пароль
// и возвращает JWT
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', userRouters);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Неверно введена ссылка'));
});

module.exports = router;
