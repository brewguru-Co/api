const createError = require('http-errors');
const Joi = require('@hapi/joi');
const moment = require('moment');
const models = require('../models');

const teaIdSchema = Joi.number().required();
const tankIdSchema = Joi.number().required();
const tankSchema = Joi.object({
  name: Joi.string().required(),
  teaId: Joi.number(),
  tempHigh: Joi.number(),
  tempLow: Joi.number(),
  phHigh: Joi.number(),
  phLow: Joi.number(),
  doHigh: Joi.number(),
  doLow: Joi.number(),
  brixHigh: Joi.number(),
  brixLow: Joi.number(),
});

function toTankObject(rawTank) {
  const tank = { ...rawTank };
  tank.createdAt = moment(rawTank.createdAt).unix();
  tank.updatedAt = moment(rawTank.updatedAt).unix();
  return tank;
}

async function create(req, res, next) {
  try {
    const { body } = req;
    const value = await tankSchema.validateAsync(body);
    await teaIdSchema.validateAsync(body.teaId);

    return models.tank
      .create(value)
      .then((tank) => res.send(toTankObject(tank.dataValues)))
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

async function update(req, res, next) {
  try {
    const { body, params } = req;
    const value = await tankSchema.validateAsync(body);
    await tankIdSchema.validate(params.tankId);

    const options = {
      where: { id: params.tankId },
      raw: true,
    };

    return models.tank
      .update(value, options)
      .then(([updated]) => {
        if (updated) {
          models.tank.findOne(options).then((tank) => res.send(toTankObject(tank)));
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
  models.tank
    .findAll({ raw: true })
    .then((tanks) => res.send(tanks.map((tank) => toTankObject(tank))))
    .catch((err) => next(err));
}

async function remove(req, res, next) {
  try {
    const { body } = req;
    const value = await tankIdSchema.validateAsync(body.tankId);

    const options = {
      where: { id: value },
      raw: true,
    };

    return models.tank
      .destroy(options)
      .then((deleted) => {
        if (deleted) {
          res.send({ tankId: value });
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
