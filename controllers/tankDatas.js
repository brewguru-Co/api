const createError = require('http-errors');
const Joi = require('@hapi/joi');
const moment = require('moment');
const models = require('../models');

const tankDataSchema = Joi.object({
  name: Joi.string().required(),
  temp: Joi.number().required(),
  ph: Joi.number().required(),
  doxy: Joi.number().required(),
  brix: Joi.number().required(),
});

function toTankDataObject(rawTankData) {
  const {
    name, temp, ph, doxy, brix, createdAt,
  } = rawTankData;
  return {
    name,
    temp,
    ph,
    doxy,
    brix,
    createdAt: moment(createdAt).unix(),
  };
}

async function create(req, res, next) {
  try {
    const { body } = req;
    const value = await tankDataSchema.validateAsync(body);
    value.createdAt = Date.now();

    const tankDataDoc = new models.TankData(value);
    return tankDataDoc.save()
      .then((tankData) => res.send(toTankDataObject(tankData)))
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

function get(req, res, next) {
  models.TankData.find()
    .then((tankDatas) => res.send(tankDatas.map((tankData) => toTankDataObject(tankData))))
    .catch((err) => next(err));
}

module.exports = {
  create,
  get,
};
