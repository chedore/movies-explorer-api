require('dotenv').config();

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

app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошиибок
app.use(errorHandler);

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
