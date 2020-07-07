const createError = require('http-errors');
const Joi = require('@hapi/joi');
const moment = require('moment');
const models = require('../models');

const tankDataSchema = Joi.object({
  name: Joi.string(),
  temp: Joi.number(),
  ph: Joi.number(),
  doxy: Joi.number(),
  brix: Joi.number(),
});

function toTankDataObject(rawTankData) {
  const {
    id, name, temp, ph, doxy, brix, createdAt,
  } = rawTankData;
  return {
    id,
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
