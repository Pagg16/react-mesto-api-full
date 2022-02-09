const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { Router } = require('express');
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/users');

const singinSingup = new Router();

singinSingup.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(20),
  }),
}), login);

singinSingup.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(20),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new Error('Неправильный формат ссылки');
      }
      return value;
    }),
  }),
}), createUser);

module.exports = singinSingup;
