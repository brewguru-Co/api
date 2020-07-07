const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config.json')[env];

module.exports = async () => {
  const connection = await mongoose.connect(config.mongooseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connection;
};
