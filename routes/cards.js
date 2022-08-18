const router = require('express').Router();
const {
  getAllCards, createCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  cardValidation, idValidation,
} = require('../middlewares/validate');

router.get('/', getAllCards);
router.post('/', cardValidation, createCards);
router.delete('/:cardId', idValidation, deleteCard);
router.put('/:cardId/likes', idValidation, likeCard);
router.delete('/:cardId/likes', idValidation, dislikeCard);

module.exports = router;
