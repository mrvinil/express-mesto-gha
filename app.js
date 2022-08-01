const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.get('/', (req, res) => {
  res.send({ foo: 'Hello World!' });
});

app.post('/', express.json(), (req, res) => {
  res.send({ ...req.body, from: 'server' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
