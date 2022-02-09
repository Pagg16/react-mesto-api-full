const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { Router } = require('express');
const { allUsers } = require('../controllers/users');
const { currentUser } = require('../controllers/users');
const { updateUser } = require('../controllers/users');
const { updateUserAvatar } = require('../controllers/users');
const { oneUser } = require('../controllers/users');

const userRouter = new Router();

userRouter.get('/', allUsers);

userRouter.get('/me', currentUser);

userRouter.get('/:userid', celebrate({
  params: Joi.object().keys({
    userid: Joi.string().required().alphanum().length(24),
  }),
}), oneUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2).custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new Error('Неправильный формат ссылки');
      }
      return value;
    }),
  }),
}), updateUserAvatar);

module.exports = userRouter;
