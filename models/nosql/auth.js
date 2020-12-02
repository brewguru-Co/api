const mongoose = require('mongoose');
const { hash } = require('../../helpers/utils');
const { generateToken } = require('../../helpers/token');

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

authSchema.methods.generateToken = function () {
  const payload = {
    // eslint-disable-next-line no-underscore-dangle
    _id: this._id,
    id: this.id,
  };
  return generateToken(payload);
};

module.exports = mongoose.model('auth', authSchema);
