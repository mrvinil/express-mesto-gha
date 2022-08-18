const jwt = require('jsonwebtoken');
const Auth = require('../errors/Auth');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Auth('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    throw new Auth('Необходима авторизация');
  }

  req.user = payload;
  next();
};

module.exports = auth;
