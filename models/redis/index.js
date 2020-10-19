const redis = require('redis');
const logger = require('../../helpers/logger');

const client = redis.createClient();

client.on('error', (error) => logger.error(error));
client.on('connect', (error) => logger.info('Redis Connected Successfully!!'));

module.exports = client;
