const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  // страна создания фильма
  country: {
    type: String,
    required: [true, 'Поле "country" должно быть заполнено'],
  },
  // режиссёр фильма
  director: {
    type: String,
    required: [true, 'Поле "director" должно быть заполнено'],
  },
  // длительность фильма
  duration: {
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
  },
  // год выпуска фильма
  year: {
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
  },
  // описание фильма
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
  },
  // ссылка на постер к фильму
  image: {
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Должен быть действительный URL',
    },
  },
  // ссылка на трейлер фильма
  trailerLink: {
    type: String,
    required: [true, 'Поле "trailerLink" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Должен быть действительный URL',
    },
  },
  // миниатюрное изображение постера к фильму
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Должен быть действительный URL',
    },
  },
  // _id пользователя
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Поле "owner" должно быть заполнено'],
    ref: 'user',
  },
  // id фильма
  movieId: {
    type: Number,
    required: [true, 'Поле "movieId" должно быть заполнено'],
  },
  // название фильма на русском языке
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" должно быть заполнено'],
  },
  // название фильма на английском языке
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" должно быть заполнено'],
  },

}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
