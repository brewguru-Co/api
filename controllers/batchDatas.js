const createError = require('http-errors');
const Joi = require('@hapi/joi');
const models = require('../models');

const batchDataSchema = Joi.object({
  batchId: Joi.number().required(),
  temp: Joi.number().required(),
  ph: Joi.number().required(),
  dox: Joi.number().required(),
  brix: Joi.number().required(),
  timestamp: Joi.number().required(),
});

function toBatchDataObject(rawTankData) {
  const {
    batchId, temp, ph, dox, brix, timestamp,
  } = rawTankData;
  return {
    batchId,
    temp,
    ph,
    dox,
    brix,
    timestamp: timestamp / 1000,
  };
}

function filterData(datas, unit = 'hour') {
  const HOUR = 60 * 60 * 1000;
  const DAY = 24 * HOUR;
  const divider = unit === 'hour' ? HOUR : DAY;
  return datas.filter((data) => data.timestamp % divider === 0);
}

function groupByBatchId(batchDatas) {
  const obj = {};
  for (let i = 0; i < batchDatas.length; i += 1) {
    const batchData = batchDatas[i];
    if (!obj[batchData.batchId]) {
      obj[batchData.batchId] = [];
    }
    obj[batchData.batchId].push(toBatchDataObject(batchDatas[i]));
  }
  return obj;
}

async function get(req, res, next) {
  try {
    const { unit } = req.params;
    return models.BatchData.find()
      .then((batchDatas) => res.send(groupByBatchId(filterData(batchDatas, unit))))
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

async function create(req, res, next) {
  try {
    const { body } = req;
    const value = await batchDataSchema.validateAsync(body);

    const batchDataDoc = new models.BatchData(value);
    return batchDataDoc
      .save()
      .then((batchData) => res.send(toBatchDataObject(batchData)))
      .catch((err) => next(err));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

module.exports = {
  get,
  create,
};
