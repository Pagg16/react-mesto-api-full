require('dotenv').config();
const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');
const singinSingup = require('./routes/singinSingup');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const NotFound = require('./errors/not-found');
const cors = require('./cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(cors);

app.use(express.json());

app.use(requestLogger);

app.use(singinSingup);

app.use(auth, router);

app.use((req, res, next) => {
  next(new NotFound('данные отсутствуют по указанному роуту'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

function startApp() {
  try {
    app.listen(PORT, () => console.log(`Сервер запущен на порту + ${PORT}`));
    mongoose.connect(DB_URL, () => {
      console.log(
        `Подключение к базе данных прошло успешно по адресу ${DB_URL}`,
      );
    });
  } catch (err) {
    console.log(err);
  }
}

startApp();
