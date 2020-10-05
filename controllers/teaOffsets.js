const createError = require('http-errors');
const Joi = require('@hapi/joi');
const moment = require('moment');
const models = require('../models');

const teaOffsetIdSchema = Joi.number()
  .required()
  .error(() => new Error('id is required'));
const createSchema = Joi.object({
  teaId: Joi.number().required(),
  temp: Joi.number(),
  ph: Joi.number(),
  dox: Joi.number(),
  brix: Joi.number(),
});
const teaOffsetSchema = Joi.object({
  teaId: Joi.number(),
  temp: Joi.number(),
  ph: Joi.number(),
  dox: Joi.number(),
  brix: Joi.number(),
});

function toTeaOffsetObject(rawTeaOffset) {
  const {
    id, teaId, temp, ph, dox, brix, createdAt, updatedAt,
  } = rawTeaOffset;
  return {
    id,
    teaId,
    teaName: rawTeaOffset['tea.name'],
    temp,
    ph,
    dox,
    brix,
    createdAt: moment(createdAt).unix(),
    updatedAt: moment(updatedAt).unix(),
  };
}

async function create(req, res, next) {
  try {
    const { body } = req;
    await createSchema.validateAsync(body);
    const value = await teaOffsetSchema.validateAsync(body);

    return models.teaOffset
      .create(value)
      .then((teaOffset) => models.teaOffset
        .findOne({ raw: true, include: models.tea, where: { id: teaOffset.dataValues.id } })
        .then((result) => res.send(toTeaOffsetObject(result))))
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

async function update(req, res, next) {
  try {
    const { body, params } = req;
    await teaOffsetIdSchema.validateAsync(params.id);
    const value = await teaOffsetSchema.validateAsync(body);

    const options = {
      where: { id: params.id },
      raw: true,
      include: models.tea,
    };

    return models.teaOffset
      .update(value, options)
      .then(([updated]) => {
        if (updated) {
          models.teaOffset
            .findOne(options)
            .then((teaOffset) => res.send(toTeaOffsetObject(teaOffset)));
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
  models.teaOffset
    .findAll({ raw: true, include: models.tea })
    .then((teaOffsets) => res.send(teaOffsets.map((teaOffset) => toTeaOffsetObject(teaOffset))))
    .catch((err) => next(err));
}

async function remove(req, res, next) {
  try {
    const { body } = req;
    const id = await teaOffsetIdSchema.validateAsync(body.id);

    const options = {
      where: { id },
      raw: true,
    };

    return models.teaOffset
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
