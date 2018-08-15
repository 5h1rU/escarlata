const Errors = (error, req, res, next) => {
  switch (error.name) {
    case 'ValidationError':
      return res.status(400).send({ error: error.message });
    case 'UnauthorizedError':
      return res.status(403).send({ error: error.message });
    case 'NotFoundError':
      return res.status(404).send({ error: error.message });
    default:
      return next(error);
  }
};

module.exports = Errors;
