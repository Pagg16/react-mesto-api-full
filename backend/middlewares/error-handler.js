const { SERVER_ERROR } = require('../errors/errors');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || SERVER_ERROR;
  res.status(statusCode).send({ message: err.message });
  next();
};

module.exports = errorHandler;
