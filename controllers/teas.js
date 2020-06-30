const models = require('../models');
const moment = require('moment');
const Joi = require('@hapi/joi');

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
})


function toTeaObject(rawTea) {
  const tea = Object.assign({}, rawTea);
  tea.createdAt = moment(rawTea.createdAt).unix();
  tea.updatedAt = moment(rawTea.updatedAt).unix();
  return tea;
}

function create(req, res, next) {
  const { body } = req;
  const { error, value } = teaSchema.validate(body);

  if (error) {
    return res.send(error.message);
  }
  models.tea.create(value)
    .then(tea => res.send(toTeaObject(tea.dataValues)))
    .catch(error => next(error));
}

function update(req, res) {

}

function get(req, res) {
  models.tea.findAll({ raw: true }).then(teas => res.send(teas.map(tea => toTeaObject(tea))))
}

function remove(req, res) {

}

module.exports = {
  create,
  update,
  get,
  remove,
}
