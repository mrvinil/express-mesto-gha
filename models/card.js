const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, 'Название должно содержать минимум 2 символа, вы ввели {VALUE}'],
    maxLength: [30, 'Название должно содержать максимум 30 символов, вы ввели {VALUE}'],
    required: [true, 'Название обязательно для заполнения'],
  },
  link: {
    type: String,
    required: [true, 'Картинка обязательно для заполнения'],
    validate: {
      validator(v) {
        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(v);
      },
      message: 'Неверный URL.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Автор обязательно для заполнения'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
