const router = require('express').Router();
const {
  loginValidation, userValidation,
} = require('../middlewares/validate');
const {
  login, createUser,
} = require('../controllers/users');

router.post('/signin', loginValidation, login);
router.post('/signup', userValidation, createUser);

module.exports = router;
