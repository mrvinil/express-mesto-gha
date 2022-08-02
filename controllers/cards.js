const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ cards }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

const createCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id} }, { new: true })
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id} }, { new: true })
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};


module.exports = { getAllCards, createCards, deleteCard, likeCard, dislikeCard };