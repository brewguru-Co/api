const createError = require('http-errors');
const Joi = require('@hapi/joi');
const moment = require('moment');
const models = require('../models');

const teaSchema = Joi.object({
  name: Joi.string().required(),
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
  const tea = { ...rawTea };
  tea.createdAt = moment(rawTea.createdAt).unix();
  tea.updatedAt = moment(rawTea.updatedAt).unix();
  return tea;
}

function create(req, res, next) {
  const { body } = req;
  const { error, value } = teaSchema.validate(body);

  if (error) {
    return next(createError(404, error.message));
  }
  return models.tea
    .create(value)
    .then((tea) => res.send(toTeaObject(tea.dataValues)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  const { body } = req;
  const { error, value } = teaSchema.validate(body);

  if (error) {
    return next(createError(404, error.message));
  }

  const options = {
    where: { name: value.name },
    raw: true,
  };

  return models.tea
    .update(value, options)
    .then(([updated]) => {
      if (updated) {
        models.tea.findOne(options).then((tea) => res.send(toTeaObject(tea)));
      } else {
        next(createError(404, 'Nothing to update'));
      }
    })
    .catch((err) => next(err));
}

function get(req, res, next) {
  models.tea
    .findAll({ raw: true })
    .then((teas) => res.send(teas.map((tea) => toTeaObject(tea))))
    .catch((err) => next(err));
}

function remove(req, res, next) {
  const { body } = req;
  const { error, value } = teaSchema.validate(body);

  if (error) {
    return next(createError(404, error.message));
  }

  const options = {
    where: { name: value.name },
    raw: true,
  };

  return models.tea
    .destroy(options)
    .then((deleted) => {
      if (deleted) {
        res.send({});
      } else {
        next(createError(404, 'Nothing to delete'));
      }
    })
    .catch((err) => next(err));
}

module.exports = {
  create,
  update,
  get,
  remove,
};
