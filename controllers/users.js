const bcrypt = require('bcrypt');
const User = require('../models/user');
const { ERR_BAD_REQUEST, ERR_NOT_FOUND, ERR_INTERNAL_SERVER_ERROR } = require('../errors/errors');
const Conflict = require('../errors/Conflict');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => res.status(ERR_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(ERR_NOT_FOUND).send({ message: 'Пользователь по указанному id не найден' });
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERR_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password,10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      data: {
        name: user.name, about: user.about, avatar: user.avatar, email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError' && err.code === 11000) {
        throw new Conflict('Пользователь с таким email уже существует');
        // res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
        // return;
      }
      // res.status(ERR_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    })
    .catch(next);
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERR_NOT_FOUND).send({ message: 'Пользователь по указанному id не найден' });
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
        return;
      }
      res.status(ERR_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERR_NOT_FOUND).send({ message: 'Пользователь по указанному id не найден' });
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара' });
        return;
      }
      res.status(ERR_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getAllUsers, getUser, createUser, updateUser, updateAvatar,
};
