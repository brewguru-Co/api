const createError = require('http-errors');
const Joi = require('@hapi/joi');
const models = require('../models');
const logger = require('../helpers/logger');

const authSchema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().required(),
});

async function create(req, res, next) {
  try {
    const { body } = req;
    const value = await authSchema.validateAsync(body);

    let existing = null;
    try {
      existing = await models.Auth.findById(body);
    } catch (e) {
      logger.error(e, { at: 'auth' });
      next(createError(500, 'Internal Server Error'));
    }

    if (existing) {
      return res.status(409).send('Already Exist');
    }

    const auth = await models.Auth.register(value);

    let token = null;
    try {
      token = await auth.generateToken();
    } catch (e) {
      logger.error(e, { at: 'token' });
      return next(createError(500, 'Internal Server Error'));
    }

    res.cookie('access_token', token, { httpOnly: true, maxAge: 3 * 60 * 60 * 1000 });
    return res.status(201).send({ id: value.id });
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

    let token = null;
    try {
      token = await auth.generateToken();
    } catch (e) {
      logger.error(e, { at: 'token' });
      return next(createError(500, 'Internal Server Error'));
    }

    res.cookie('access_token', token, { httpOnly: true, maxAge: 3 * 60 * 60 * 1000 });
    // res.setHeader('Location', '/');
    return res.status(200).send({ id: value.id });
  } catch (e) {
    return next(createError(400, e.message));
  }
}

function check(req, res) {
  const { user } = req;
  if (!user) {
    return res.status(403).end();
  }
  return res.send(user);
}

module.exports = {
  create,
  login,
  check,
};
