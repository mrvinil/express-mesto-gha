const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const NotFound = require('./errors/NotFound');
const { loginValidation, userValidation } = require('./middlewares/validate');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 62e90ecc6edc1960644334a2

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);

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
