const JWT = require('../lib/auth');
const asyncUtil = require('../lib/async');
const { errorBuilder } = require('../lib/errors');

const verifyToken = asyncUtil(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw errorBuilder({
      name: 'UnauthorizedError',
      message: 'Token not provided'
    });
  }

  const token = req.headers.authorization.split(' ')[1];
  const payload = await JWT.verify(token);
  req.user = {
    id: payload.sub,
    scopes: payload.scopes
  };
  return next();
});

module.exports = verifyToken;
