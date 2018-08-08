const JWT = require('../lib/auth');
const asyncUtil = require('../lib/async');

const verifyToken = asyncUtil(async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ error: 'Unauthorized' });
  }
  const token = req.headers.authorization.split(' ')[1];
  const payload = await JWT.verify(token);
  req.user = payload;
  return next();
});

module.exports = verifyToken;
