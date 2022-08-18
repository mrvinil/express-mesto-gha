const jwt = require('jsonwebtoken');
const Auth = require('../errors/Auth');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Auth('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret-key');
  } catch (err) {
    return next(new Auth('Необходима авторизация'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
