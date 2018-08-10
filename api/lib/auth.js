const jwt = require('jsonwebtoken');
const { SECRET_KEY_TOKEN } = require('../../config');
const { errorBuilder } = require('./errors');

const JWT = {
  verify: token => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY_TOKEN, (error, decodedToken) => {
        /**
         * This is a block waiting for a proper Date condition
         * Don't use yet.

        if (decodedToken <= Date) {
          return reject({
            name: 'UnauthorizedError',
            message: 'Token expired'
          });
        }
        */
        if (error || !decodedToken) {
          const error = errorBuilder({
            name: 'UnauthorizedError',
            message: 'Bad Token'
          });

          return reject(error);
        }

        resolve(decodedToken.sub);
      });
    });
  },
  create: ({ maxAge = 3600, data }) => {
    return jwt.sign({ sub: data }, SECRET_KEY_TOKEN, {
      expiresIn: maxAge,
      algorithm: 'HS256'
    });
  }
};

module.exports = JWT;
