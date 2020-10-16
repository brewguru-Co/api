const mongoose = require('mongoose');

const { Schema } = mongoose;

const materialSchema = new Schema({
  batchId: Number,
  sugar: Object,
  tea: Object,
  spawn: Object,
  subMaterials: Array,
  createdAt: Number,
});

module.exports = mongoose.model('material', materialSchema);
