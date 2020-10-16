const createError = require('http-errors');
const Joi = require('@hapi/joi');
const models = require('../models');

const materialSchema = Joi.object({
  batchId: Joi.number().required(),
  sugar: Joi.object({
    name: Joi.string().required(),
    value: Joi.number().required(),
  }).required(),
  tea: Joi.object({
    name: Joi.string().required(),
    value: Joi.number().required(),
  }).required(),
  spawn: Joi.object({
    name: Joi.string().required(),
    value: Joi.number().required(),
  }).required(),
  subMaterials: Joi.array().items({
    name: Joi.string().required(),
    value: Joi.number().required(),
  }),
  createdAt: Joi.number(),
});

function toMaterialObject(rawTankData) {
  const {
    batchId, sugar, tea, spawn, subMaterials, createdAt,
  } = rawTankData;
  return {
    batchId, sugar, tea, spawn, subMaterials, createdAt: Math.floor(createdAt / 1000),
  };
}

async function get(req, res, next) {
  try {
    return models.Material.find()
      .then((materials) => res.send(materials.map(material => toMaterialObject(material))))
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

async function create(req, res, next) {
  try {
    const { body } = req;
    const value = await materialSchema.validateAsync(body);

    value.createdAt = Date.now();
    const materialDoc = new models.Material(value);
    return materialDoc
      .save()
      .then((material) => res.send(toMaterialObject(material)))
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

module.exports = {
  get,
  create,
};
