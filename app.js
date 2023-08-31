require('dotenv').config();
const process = require('process');

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { DB, PORT } = require('./utils/constant');
const router = require('./routes/index');

const limiter = require('./middlewares/rate_limiter');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(helmet());

app.use(cors);

// число запросов с одного IP в единицу времени ограничено
app.use(limiter);

mongoose.connect(DB, {});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

app.use('/', router);

// обработчик ошибок celebrate
app.use(errors());

app.use(errorLogger);

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
