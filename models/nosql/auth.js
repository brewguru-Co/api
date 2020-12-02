const mongoose = require('mongoose');
const { hash } = require('../../helpers/utils');

const { Schema } = mongoose;

const authSchema = new Schema({
  id: String,
  password: String,
});

authSchema.statics.register = function ({ id, password }) {
  const auth = new this({ id, password: hash(password) });
  return auth.save();
};

authSchema.statics.findById = function ({ id }) {
  return this.findOne({ id }).exec();
};

authSchema.methods.validatePassword = function (password) {
  return this.password === hash(password);
};

module.exports = mongoose.model('auth', authSchema);
