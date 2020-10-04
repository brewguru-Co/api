const createError = require('http-errors');
const Joi = require('@hapi/joi');
const models = require('../models');

const targetIdSchema = Joi.number()
  .required()
  .error(() => new Error('id is required'));
const createSchema = Joi.object({
  email: Joi.string(),
  phone: Joi.string(),
  name: Joi.string().required(),
  on: Joi.boolean(),
}).or('email', 'phone');
const updateSchema = Joi.object({
  email: Joi.string(),
  phone: Joi.string(),
  name: Joi.string(),
  on: Joi.boolean(),
});

function toNotificationTargetObject(rawNotification) {
  const {
    id, name, email, phone, on,
  } = rawNotification;
  return {
    id,
    name,
    email,
    phone,
    on: Boolean(on),
  };
}

async function create(req, res, next) {
  try {
    const { body } = req;
    const value = await createSchema.validateAsync(body);

    return models.notificationTarget
      .create(value)
      .then((result) => res.send(toNotificationTargetObject(result.dataValues)))
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

async function update(req, res, next) {
  try {
    const { body, params } = req;
    const id = await targetIdSchema.validateAsync(params.id);
    const value = await updateSchema.validateAsync(body);

    const options = {
      where: { id },
      raw: true,
    };

    return models.notificationTarget
      .update(value, options)
      .then(([updated]) => {
        if (updated) {
          models.notificationTarget
            .findOne(options)
            .then((notification) => res.send(toNotificationTargetObject(notification)));
        } else {
          next(createError(400, "Bad request (id doesn't exit)"));
        }
      })
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

function get(req, res, next) {
  models.notificationTarget
    .findAll({ raw: true })
    .then((targets) => res.send(targets.map((target) => toNotificationTargetObject(target))))
    .catch((err) => next(err));
}

async function remove(req, res, next) {
  try {
    const { body } = req;
    const id = await targetIdSchema.validateAsync(body.id);

    const options = {
      where: { id },
      raw: true,
    };

    return models.notificationTarget
      .destroy(options)
      .then((deleted) => {
        if (deleted) {
          res.send({ id });
        } else {
          next(createError(400, "Bad request (id doesn't exit)"));
        }
      })
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(404, e.message));
  }
}

module.exports = {
  create,
  update,
  get,
  remove,
};
