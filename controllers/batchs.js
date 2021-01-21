const createError = require('http-errors');
const Joi = require('@hapi/joi');
const moment = require('moment');
const models = require('../models');

const batchIdSchema = Joi.number()
  .required()
  .error(() => new Error('batch id is required'));
const createBatchSchema = Joi.object({
  teaId: Joi.number().required(),
  tankId: Joi.number().required(),
  startedAt: Joi.number().required(),
  finishedAt: Joi.number(),
  temp: Joi.number(),
  ph: Joi.number(),
  dox: Joi.number(),
  brix: Joi.number(),
});
const batchSchema = Joi.object({
  teaId: Joi.number(),
  tankId: Joi.number(),
  temp: Joi.number(),
  ph: Joi.number(),
  dox: Joi.number(),
  brix: Joi.number(),
  startedAt: Joi.number(),
  finishedAt: Joi.number(),
  hasError: Joi.boolean(),
});

function toBatchObject(rawBatch) {
  const {
    id,
    teaId,
    tankId,
    temp,
    ph,
    dox,
    brix,
    startedAt,
    finishedAt,
    hasError,
    createdAt,
    updatedAt,
  } = rawBatch;
  return {
    id,
    teaId,
    tankId,
    teaName: rawBatch['tea.name'],
    tankName: rawBatch['tank.name'],
    temp,
    ph,
    dox,
    brix,
    hasError: Boolean(hasError),
    startedAt: moment(startedAt).unix(),
    finishedAt: finishedAt ? moment(finishedAt).unix() : null,
    createdAt: moment(createdAt).unix(),
    updatedAt: moment(updatedAt).unix(),
  };
}

async function create(req, res, next) {
  try {
    const { body } = req;
    await createBatchSchema.validateAsync(body);
    const value = await batchSchema.validateAsync(body);

    return models.batch
      .create(value)
      .then((batch) => models.batch
        .findOne({
          raw: true,
          include: [models.tea, models.tank],
          where: { id: batch.dataValues.id },
        })
        .then((result) => res.send(toBatchObject(result))))
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

async function update(req, res, next) {
  try {
    const { body, params } = req;
    const value = await batchSchema.validateAsync(body);
    await batchIdSchema.validateAsync(params.id);

    const options = {
      where: { id: params.id },
      raw: true,
      include: [models.tea, models.tank],
    };

    return models.batch
      .update(value, options)
      .then(([updated]) => {
        if (updated) {
          models.batch.findOne(options).then((batch) => res.send(toBatchObject(batch)));
        } else {
          next(createError(400, "Bad request (batchId doesn't exit)"));
        }
      })
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

function get(req, res, next) {
  models.batch
    .findAll({ raw: true, include: [models.tea, models.tank] })
    .then((batchs) => res.send(
      batchs
        .filter((batch) => moment(batch.startedAt).unix() <= Date.now() / 1000)
        .map((batch) => toBatchObject(batch)),
    ))
    .catch((err) => next(err));
}

async function remove(req, res, next) {
  try {
    const { body } = req;
    const id = await batchIdSchema.validateAsync(body.id);

    const options = {
      where: { id },
      raw: true,
    };

    return models.batch
      .destroy(options)
      .then((deleted) => {
        if (deleted) {
          res.send({ id });
        } else {
          next(createError(400, "Bad request (batchId doesn't exit)"));
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
