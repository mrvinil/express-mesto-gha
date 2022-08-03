const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { ERR_NOT_FOUND } = require('./errors/errors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62e90ecc6edc1960644334a2',
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);

app.use((req, res) => {
  res.status(ERR_NOT_FOUND).send({ message: 'Страница не найдена!' });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening port ${PORT}`);
  }
});
