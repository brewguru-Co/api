const createError = require('http-errors');
const Joi = require('@hapi/joi');
const moment = require('moment');
const models = require('../models');

const teaIdSchema = Joi.number()
  .required()
  .error(() => new Error('tea id is required'));
const tankIdSchema = Joi.number()
  .required()
  .error(() => new Error('tank id is required'));
const tankNameSchema = Joi.string()
  .required()
  .error(() => new Error('tank name is required'));
const tankSchema = Joi.object({
  name: Joi.string(),
  teaId: Joi.number(),
  tempHigh: Joi.number(),
  tempLow: Joi.number(),
  phHigh: Joi.number(),
  phLow: Joi.number(),
  doxHigh: Joi.number(),
  doxLow: Joi.number(),
  brixHigh: Joi.number(),
  brixLow: Joi.number(),
});

function toTankObject(rawTank) {
  const {
    id,
    name,
    teaId,
    tempHigh,
    tempLow,
    phHigh,
    phLow,
    doxHigh,
    doxLow,
    brixHigh,
    brixLow,
    createdAt,
    updatedAt,
  } = rawTank;
  return {
    id,
    name,
    teaId,
    teaName: rawTank['tea.name'],
    tempHigh,
    tempLow,
    phHigh,
    phLow,
    doxHigh,
    doxLow,
    brixHigh,
    brixLow,
    createdAt: moment(createdAt).unix(),
    updatedAt: moment(updatedAt).unix(),
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
      .then((tank) => models.tank
        .findOne({ raw: true, include: models.tea, where: { id: tank.dataValues.id } })
        .then((result) => res.send(toTankObject(result))))
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

async function update(req, res, next) {
  try {
    const { body, params } = req;
    const value = await tankSchema.validateAsync(body);
    await tankIdSchema.validateAsync(params.id);

    const options = {
      where: { id: params.id },
      raw: true,
      include: models.tea,
    };

    return models.tank
      .update(value, options)
      .then(([updated]) => {
        if (updated) {
          models.tank.findOne(options).then((tank) => res.send(toTankObject(tank)));
        } else {
          next(createError(400, "Bad request (tankId doesn't exit)"));
        }
      })
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

function get(req, res, next) {
  models.tank
    .findAll({ raw: true, include: models.tea })
    .then((tanks) => res.send(tanks.map((tank) => toTankObject(tank))))
    .catch((err) => next(err));
}

async function remove(req, res, next) {
  try {
    const { body } = req;
    const id = await tankIdSchema.validateAsync(body.id);

    const options = {
      where: { id },
      raw: true,
    };

    return models.tank
      .destroy(options)
      .then((deleted) => {
        if (deleted) {
          res.send({ id });
        } else {
          next(createError(400, "Bad request (tankId doesn't exit)"));
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
