const createError = require('http-errors');
const Joi = require('@hapi/joi');
const moment = require('moment');
const models = require('../models');

const notificationIdSchema = Joi.number().required().error(() => new Error('notification id is required'));
const notificationSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().min(10).max(11),
  on: Joi.boolean(),
}).xor('email', 'phone');

function toNotificationObject(rawNotification) {
  const {
    id, email, phone, on, sentAt,
  } = rawNotification;
  return {
    id,
    email,
    phone,
    on,
    sentAt,
    createdAt: moment(rawNotification.createdAt).unix(),
    updatedAt: moment(rawNotification.updatedAt).unix(),
  };
}

async function create(req, res, next) {
  try {
    const { body } = req;
    const value = await notificationSchema.validateAsync(body);

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
    await notificationIdSchema.validate(params.tankId);

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
