const errorsUtil = ({ error, req, res, next, name, statusCode }) => {
  if (error.name === name) {
    return res.status(statusCode).send({ error: error.message });
  }
  return next(error);
};

const errorBuilder = ({ name, message }) => {
  if (!name || !message) {
    throw new Error('name and message fields are always mandatory');
  }
  const error = new Error(message);
  error.name = name;
  return error;
};

module.exports = {
  errorsUtil,
  errorBuilder
};
