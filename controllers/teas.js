const createError = require('http-errors');
const Joi = require('@hapi/joi');
const moment = require('moment');
const models = require('../models');

const teaIdSchema = Joi.number().required().error(() => new Error('tea id is required'));
const teaNameSchema = Joi.string().required().error(() => new Error('tea name is required'));
const teaSchema = Joi.object({
  name: Joi.string(),
  tempHighOp: Joi.number(),
  tempLowOp: Joi.number(),
  phHighOp: Joi.number(),
  phLowOp: Joi.number(),
  doHighOp: Joi.number(),
  doLowOp: Joi.number(),
  brixHighOp: Joi.number(),
  brixLowOp: Joi.number(),
});

function toTeaObject(rawTea) {
  const {
    id, name, tempHighOp, tempLowOp, phHighOp, phLowOp, doHighOp, doLowOp, brixHighOp, brixLowOp,
    createdAt, updatedAt,
  } = rawTea;
  return {
    id,
    name,
    tempHighOp,
    tempLowOp,
    phHighOp,
    phLowOp,
    doHighOp,
    doLowOp,
    brixHighOp,
    brixLowOp,
    createdAt: moment(createdAt).unix(),
    updatedAt: moment(updatedAt).unix(),
  };
}

async function create(req, res, next) {
  try {
    const { body } = req;
    const value = await teaSchema.validateAsync(body);
    await teaNameSchema.validateAsync(body.name);

    return models.tea
      .create(value)
      .then((tea) => res.send(toTeaObject(tea.dataValues)))
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

async function update(req, res, next) {
  try {
    const { body, params } = req;
    const value = await teaSchema.validateAsync(body);
    await teaIdSchema.validateAsync(params.teaId);

    const options = {
      where: { id: params.teaId },
      raw: true,
    };

    return models.tea
      .update(value, options)
      .then(([updated]) => {
        if (updated) {
          models.tea.findOne(options).then((tea) => res.send(toTeaObject(tea)));
        } else {
          next(createError(400, "Bad request (teaId doesn't exit)"));
        }
      })
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

function get(req, res, next) {
  models.tea
    .findAll({ raw: true })
    .then((teas) => res.send(teas.map((tea) => toTeaObject(tea))))
    .catch((err) => next(err));
}

async function remove(req, res, next) {
  try {
    const { body } = req;
    const value = await teaIdSchema.validateAsync(body.teaId);

    const options = {
      where: { id: value },
      raw: true,
    };

    return models.tea
      .destroy(options)
      .then((deleted) => {
        if (deleted) {
          res.send({ id: value });
        } else {
          next(createError(400, "Bad request (teaId doesn't exit)"));
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
