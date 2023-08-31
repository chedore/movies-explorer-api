const router = require('express').Router();
const {
  validateUserProfile,
} = require('../middlewares/validation');
const {
  doesMeExist,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', doesMeExist, getUserProfile);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', validateUserProfile, doesMeExist, updateUserProfile);

module.exports = router;
