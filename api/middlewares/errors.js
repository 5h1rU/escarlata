const Errors = (error, req, res, next) => {
  switch (error.name) {
    case 'ValidationError':
      return res.status(400).send({ error: error.message });
      break;
    case 'UnauthorizedError':
      return res.status(403).send({ error: error.message });
      break;
    case 'NotFoundError':
      return res.status(404).send({ error: error.message });
      break;
    default:
      return next(error);
      break;
  }
};

module.exports = Errors;
