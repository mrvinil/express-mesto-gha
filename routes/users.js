const router = require('express').Router();
const {
  getAllUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

const {
  userAboutValidation, avatarValidation, idValidation,
} = require('../middlewares/validate');

router.get('/', getAllUsers);
router.get('/me', getUser);
router.get('/:userId', idValidation, getUser);
router.patch('/me', userAboutValidation, updateUser);
router.patch('/me/avatar', avatarValidation, updateAvatar);

module.exports = router;
