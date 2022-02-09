const { BAD_REQUEST } = require('./errors');

class BadRequestError extends Error {
  constructor(message) {
    super(message || 'Переданы некорректные данные');
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = BadRequestError;
