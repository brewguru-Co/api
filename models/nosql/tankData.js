const mongoose = require('mongoose');

const { Schema } = mongoose;

const tankDataSchema = new Schema({
  name: String,
  temp: Number,
  ph: Number,
  doxy: Number,
  brix: Number,
  createdAt: Date,
});

module.exports = mongoose.model('tankData', tankDataSchema);
