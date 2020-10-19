const createError = require('http-errors');
const Joi = require('@hapi/joi');
const models = require('../models');

const tankDataSchema = Joi.object({
  name: Joi.string().required(),
  temp: Joi.number().required(),
  ph: Joi.number().required(),
  doxy: Joi.number().required(),
  brix: Joi.number().required(),
  timestamp: Joi.number().required(),
});

async function create(req, res, next) {
  try {
    const { body } = req;
    const value = await tankDataSchema.validateAsync(body);

    return models.RedisClient.set(
      'realtimeData', JSON.stringify(value), (err) => (err ? next(err) : res.send('OK')),
    );
  } catch (e) {
    return next(createError(400, e.message));
  }
}

function get(req, res, next) {
  models.RedisClient.get('realtimeData', (err, value) => (err ? next(err) : res.send(JSON.parse(value))));
}

module.exports = {
  create,
  get,
};
