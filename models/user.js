const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, 'Имя должно содержать минимум 2 символа, вы ввели {VALUE}'],
    maxLength: [30, 'Имя должно содержать максимум 30 символов, вы ввели {VALUE}'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: [2, 'О себе должно содержать минимум 2 символа, вы ввели {VALUE}'],
    maxLength: [30, 'О себе должно содержать максимум 30 символов, вы ввели {VALUE}'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: [true, 'Email обязателен для заполнения'],
    unique: true,
    validate: {
      validator(email) {
        return isEmail(email);
      },
      message: 'Email указан не верно',
    },
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен для заполнения'],
    minlength: 8,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
