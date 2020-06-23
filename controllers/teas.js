const models = require('../models');
const moment = require('moment');

function toTeaObject(rawTea) {
  const tea = Object.assign({}, rawTea);
  tea.createdAt = moment(rawTea.createdAt).unix();
  tea.updatedAt = moment(rawTea.updatedAt).unix();
  return tea;
}

function create(req, res) {

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
