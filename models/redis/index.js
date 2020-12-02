const redis = require('redis');
const logger = require('../../helpers/logger');

const client = redis.createClient();

client.on('error', (error) => logger.error(error, { from: 'redis' }));
client.on('connect', () => logger.info('Redis Connected Successfully!!'));

module.exports = client;
