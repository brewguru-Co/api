const createError = require('http-errors');
const Joi = require('@hapi/joi');
const models = require('../models');

const authSchema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().required(),
});

async function create(req, res, next) {
  try {
    const { body } = req;
    const value = await authSchema.validateAsync(body);

    return models.Auth.register(value)
      .then(() => res.status(201).send('OK'))
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

async function login(req, res, next) {
  try {
    const { body } = req;
    const value = await authSchema.validateAsync(body);

    const auth = await models.Auth.findById(value);
    if (!auth || !auth.validatePassword(value.password)) {
      return next(createError(403, 'Invalid ID or Password'));
    }
    res.setHeader('Location', '/');
    return res.status(302).send('OK');
  } catch (e) {
    return next(createError(400, e.message));
  }
}

module.exports = {
  create,
  login,
};
