const createError = require('http-errors');
const Joi = require('@hapi/joi');
const moment = require('moment');
const models = require('../models');

const notificationToSchema = Joi.string().required().error(() => new Error('to is required'));
const notificationIdSchema = Joi.number().required().error(() => new Error('notification id is required'));
const notificationSchema = Joi.object({
  to: Joi.string(),
  on: Joi.boolean(),
});

function toNotificationObject(rawNotification) {
  const {
    id, to, on, sentAt,
  } = rawNotification;
  return {
    id,
    to,
    on: Boolean(on),
    sentAt: moment(sentAt).unix(),
  };
}

async function create(req, res, next) {
  try {
    const { body } = req;
    const value = await notificationSchema.validateAsync(body);
    await notificationToSchema.validateAsync(body.to);

    return models.notification
      .create(value)
      .then((notification) => res.send(toNotificationObject(notification.dataValues)))
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

async function update(req, res, next) {
  try {
    const { body, params } = req;
    const value = await notificationSchema.validateAsync(body);
    await notificationIdSchema.validate(params.notificationId);

    const options = {
      where: { id: params.notificationId },
      raw: true,
    };

    return models.notification
      .update(value, options)
      .then(([updated]) => {
        if (updated) {
          models.notification.findOne(options)
            .then((notification) => res.send(toNotificationObject(notification)));
        } else {
          next(createError(404, 'Nothing to update'));
        }
      })
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

function get(req, res, next) {
  models.notification
    .findAll({ raw: true })
    .then((notifications) => res.send(
      notifications.map((notification) => toNotificationObject(notification)),
    ))
    .catch((err) => next(err));
}

async function remove(req, res, next) {
  try {
    const { body } = req;
    const value = await notificationIdSchema.validateAsync(body.notificationId);

    const options = {
      where: { id: value },
      raw: true,
    };

    return models.notification
      .destroy(options)
      .then((deleted) => {
        if (deleted) {
          res.send({ id: value });
        } else {
          next(createError(404, 'Nothing to delete'));
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
