const jwt = require('jsonwebtoken');
const getTime = require('date-fns/get_time');
const addDays = require('date-fns/add_days');
const { SECRET_KEY_TOKEN } = require('../../config');
const { errorBuilder } = require('./errors');

const JWT = {
  verify: token => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY_TOKEN, (error, decodedToken) => {
        if (decodedToken.exp < getTime(new Date())) {
          return reject({
            name: 'UnauthorizedError',
            message: 'Token expired'
          });
        }
        if (error || !decodedToken) {
          const error = errorBuilder({
            name: 'UnauthorizedError',
            message: 'Invalid Token'
          });

          return reject(error);
        }

        resolve(decodedToken);
      });
    });
  },
  create: ({ data }) => {
    const date = new Date();
    return jwt.sign(
      {
        sub: data,
        iat: getTime(date)
      },
      SECRET_KEY_TOKEN,
      {
        expiresIn: getTime(addDays(date, 14)),
        algorithm: 'HS256'
      }
    );
  }
};

module.exports = JWT;
