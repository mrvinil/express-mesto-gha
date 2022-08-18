const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const authRoutes = require('./routes/auth');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/', authRoutes);

app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardsRoutes);

app.use((req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening port ${PORT}`);
  }
});
