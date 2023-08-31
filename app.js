require('dotenv').config();
const process = require('process');

const { PORT = 3000, DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');

const limiter = require('./middlewares/rate_limiter');
const errorHandler = require('./middlewares/error-handler');

const app = express();
app.use(express.json());
app.use(helmet());

// число запросов с одного IP в единицу времени ограничено
app.use(limiter);

mongoose.connect(DB, {});

app.use('/', router);

// обработчик ошибок celebrate
router.use(errors());

// централизованный обработчик ошиибок
app.use(errorHandler);

// обработчик не учтенных ошибок
process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
