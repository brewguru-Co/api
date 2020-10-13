const mongoose = require('mongoose');

const { Schema } = mongoose;

const batchDataSchema = new Schema({
  batchId: Number,
  temp: Number,
  ph: Number,
  dox: Number,
  brix: Number,
  timestamp: Number,
});

module.exports = mongoose.model('batch_data', batchDataSchema);
