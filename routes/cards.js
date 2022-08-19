const router = require('express').Router();
const {
  getAllCards, createCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  cardValidation, cardValidationId,
} = require('../middlewares/validate');

router.get('/', getAllCards);
router.post('/', cardValidation, createCards);
router.delete('/:cardId', cardValidationId, deleteCard);
router.put('/:cardId/likes', cardValidationId, likeCard);
router.delete('/:cardId/likes', cardValidationId, dislikeCard);

module.exports = router;
