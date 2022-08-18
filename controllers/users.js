const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const Conflict = require('../errors/Conflict');
const BadRequest = require('../errors/BadRequest');

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const id = (req.params.userId === undefined ? req.user._id : req.params.userId);
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь по указанному id не найден');
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (!isEmail(email)) {
    next(new BadRequest('Некорректные данные'));
  } else {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        email, password: hash, name, about, avatar,
      })
        .then((user) => {
          // eslint-disable-next-line no-shadow
          const { password, ...response } = user._doc;
          res.send({ response });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequest('Некорректные данные'));
          } else if (err.code === 11000) {
            next(new Conflict('Email уже зарегистрирован'));
          } else {
            next(err);
          }
        }));
  }
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь по указанному id не найден'));
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при обновлении профиля'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь по указанному id не найден'));
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при обновлении аватара'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь не найден'));
        return;
      }
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getAllUsers, getUser, createUser, updateUser, updateAvatar, login, getCurrentUser,
};
