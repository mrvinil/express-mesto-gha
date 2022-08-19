const router = require('express').Router();
const {
  getAllUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

const {
  userAboutValidation, avatarValidation, userValidationId,
} = require('../middlewares/validate');

router.get('/', getAllUsers);
router.get('/me', getUser);
router.get('/:userId', userValidationId, getUser);
router.patch('/me', userAboutValidation, updateUser);
router.patch('/me/avatar', avatarValidation, updateAvatar);

module.exports = router;
