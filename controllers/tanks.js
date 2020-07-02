const createError = require('http-errors');
const Joi = require('@hapi/joi');
const moment = require('moment');
const models = require('../models');

const teaIdSchema = Joi.number().required().error(() => new Error('tea id is required'));
const tankIdSchema = Joi.number().required().error(() => new Error('tank id is required'));
const tankNameSchema = Joi.string().required().error(() => new Error('tanke name is required'));
const tankSchema = Joi.object({
  name: Joi.string(),
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
  const {
    id, name, teaId, tempHigh, tempLow, phHigh, phLow, doHigh, doLow, brixHigh, brixLow,
  } = rawTank;
  return {
    id,
    name,
    teaId,
    tempHigh,
    tempLow,
    phHigh,
    phLow,
    doHigh,
    doLow,
    brixHigh,
    brixLow,
    createdAt: moment(rawTank.createdAt).unix(),
    updatedAt: moment(rawTank.updatedAt).unix(),
  };
}

async function create(req, res, next) {
  try {
    const { body } = req;
    const value = await tankSchema.validateAsync(body);
    await tankNameSchema.validateAsync(body.name);
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
