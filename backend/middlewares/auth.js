const jwt = require('jsonwebtoken');
//const { JWT_SECRET } = process.env;
const { JWT_SECRET } = require('../constants/config');
const UnAuthorizedError = require('../errors/UnAuthorizedError');

// const auth = (req, res, next) => {
//   const { authorization } = req.headers;
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    // return res
    //   .status(401)
    //   .send({ message: 'Authorization Required' });
      return next(new UnAuthorizedError('Authorization Required'));// 401
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // return res
    //   .status(401)
    //   .send({ message: 'Authorization Required' });
      return next(new UnAuthorizedError('Authorization Required'));// 401
  }

  req.user = payload;

  return next();
};
// module.exports = auth;