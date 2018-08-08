const Errors = {
  validation: (error, req, res, next) => {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message });
    }
    return next(error);
  },
  unauthorized: (error, req, res, next) => {
    if (error.name === 'UnauthorizedError') {
      return res.status(403).send({ error: error.message });
    }
    return next(error);
  }
};

module.exports = Errors;
