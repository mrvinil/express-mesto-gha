const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, 'Имя должно содержать минимум 2 символа, вы ввели {VALUE}'],
    maxLength: [30, 'Имя должно содержать максимум 30 символов, вы ввели {VALUE}'],
    required: [true, 'Имя обязательно для заполнения'],
  },
  about: {
    type: String,
    minLength: [2, 'О себе должно содержать минимум 2 символа, вы ввели {VALUE}'],
    maxLength: [30, 'О себе должно содержать максимум 30 символов, вы ввели {VALUE}'],
    required: [true, 'О себе обязательно для заполнения'],
  },
  avatar: {
    type: String,
    required: [true, 'Аватар обязательно для заполнения'],
  },
});

module.exports = mongoose.model('user', userSchema);
