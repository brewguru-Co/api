const async = require('async');
const createError = require('http-errors');
const Joi = require('@hapi/joi');
const moment = require('moment');
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
    temp, ph, dox, brix, timestamp,
  } = rawTankData;
  return {
    temp,
    ph,
    dox,
    brix,
    timestamp: timestamp / 1000,
  };
}

function toBatchObject(rawBatch, batchData) {
  const {
    id, teaId, tankId, temp, ph, dox, brix, startedAt, finishedAt, hasError,
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
    data: batchData,
  };
}

function filterData(datas, unit = 'hour') {
  if (unit === '15min') {
    return datas;
  }
  const HOUR = 60 * 60 * 1000;
  const DAY = 24 * HOUR;
  const divider = unit === 'hour' ? HOUR : DAY;
  return datas.filter((data) => data.timestamp % divider === 0);
}

function filterFutureData(obj) {
  const newObj = {};
  const keys = Object.keys(obj).filter((key) => {
    const value = obj[key];
    return value[0].timestamp <= Date.now() / 1000;
  });

  for (let i = 0; i < keys.length; i += 1) {
    newObj[keys[i]] = obj[keys[i]];
  }

  return newObj;
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
  return filterFutureData(obj);
}

async function get(req, res, next) {
  try {
    const { unit } = req.query;

    return async.series(
      [
        (cb) => {
          models.BatchData.find()
            .then((batchDatas) => cb(null, batchDatas))
            .catch((err) => cb(err));
        },
        (cb) => {
          models.batch
            .findAll({ raw: true, include: [models.tea, models.tank] })
            .then((batchs) => cb(null, batchs))
            .catch((err) => cb(err));
        },
      ],
      (err, [batchDatas, batchs]) => {
        if (err) next(err);
        const groupedBatchDatas = groupByBatchId(filterData(batchDatas, unit));
        res.send(batchs
          .filter((batch) => moment(batch.startedAt).unix() <= Date.now() / 1000)
          .map((batch) => toBatchObject(batch, groupedBatchDatas[batch.id])));
      },
    );
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
