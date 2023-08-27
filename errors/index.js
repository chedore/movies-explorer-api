// https://docs.python.org/3/library/http.html
const OK = 200;
const CREATED = 201;
// eslint-disable-next-line max-len
const BAD_REQUEST = 400; // переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;
const UNAUTHORIZED = 401; // неверный логин-пароль. неверный jWT
const FORBIDDEN = 403; // попытка удалить чужую карточку
const NOT_FOUND = 404; // карточка или пользователь не найден.
const CONFLICT = 409; // при регистрации указан email, который уже существует на сервере
const DEFAULT_ERROR = 500; // ошибка по-умолчанию.

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  DEFAULT_ERROR,
  CONFLICT,
};
