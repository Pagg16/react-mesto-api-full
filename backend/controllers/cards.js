const cardSchems = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const NotFound = require('../errors/not-found');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  cardSchems
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.allCards = (req, res, next) => {
  cardSchems
    .find()
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.delCard = async (req, res, next) => {
  const { cardId } = req.params;

  cardSchems
    .findById(cardId)
    .orFail(() => new NotFound('Карточка с указанным id не найдена'))
    .then((cardToDel) => {
      const owner = String(cardToDel.owner);

      const uderId = String(req.user._id);

      if (owner !== uderId) {
        throw new ForbiddenError('Карточка с указанным _id не принадлежит вам');
      }

      cardToDel.remove();
      res.status(200).send(cardToDel);
    })
    .catch((err) => {
      if (err.message === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  cardSchems
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => new NotFound('Пользователь с указанным id не существует'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  cardSchems
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => () => new NotFound('Пользователь с указанным id не существует'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
