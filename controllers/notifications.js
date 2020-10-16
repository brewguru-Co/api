const createError = require('http-errors');
const Joi = require('@hapi/joi');
const moment = require('moment');
const models = require('../models');

const notificationIdSchema = Joi.number()
  .required()
  .error(() => new Error('id is required'));
const createSchema = Joi.object({
  batchId: Joi.number().required(),
  code: Joi.string(),
  value: Joi.number(),
  min: Joi.number(),
  max: Joi.number(),
});
const notificationSchema = Joi.object({
  batchId: Joi.number(),
  code: Joi.string(),
  value: Joi.number(),
  min: Joi.number(),
  max: Joi.number(),
  action: Joi.string(),
});

function toNotificationObject(rawNotification) {
  const {
    id, batchId, code, value, min, max, action, createdAt, updatedAt,
  } = rawNotification;
  return {
    id,
    batchId,
    code,
    value,
    min,
    max,
    action,
    createdAt: moment(createdAt).unix(),
    updatedAt: moment(updatedAt).unix(),
  };
}

async function create(req, res, next) {
  try {
    const { body } = req;
    await createSchema.validateAsync(body);
    const value = await notificationSchema.validateAsync(body);

    return models.notification
      .create(value)
      .then((notification) => models.notification
        .findOne({
          raw: true,
          include: models.batch,
          where: { id: notification.dataValues.id },
        })
        .then((result) => res.send(toNotificationObject(result))))
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

async function update(req, res, next) {
  try {
    const { body, params } = req;
    await notificationIdSchema.validateAsync(params.id);
    const value = await notificationSchema.validateAsync(body);

    const options = {
      where: { id: params.id },
      raw: true,
      include: models.batch,
    };

    return models.notification
      .update(value, options)
      .then(([updated]) => {
        if (updated) {
          models.notification
            .findOne(options)
            .then((notification) => res.send(toNotificationObject(notification)));
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
  models.notification
    .findAll({ raw: true, include: models.batch })
    .then((results) => res.send(results.map((notification) => toNotificationObject(notification))))
    .catch((err) => next(err));
}

async function remove(req, res, next) {
  try {
    const { body } = req;
    const id = await notificationIdSchema.validateAsync(body.id);

    const options = {
      where: { id },
      raw: true,
    };

    return models.notification
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
    return next(createError(400, e.message));
  }
}

module.exports = {
  create,
  update,
  get,
  remove,
};
