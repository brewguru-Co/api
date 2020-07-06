const logger = require('./logger');

function handleSequelizeError(err) {
  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
      return { code: 400, message: `Bad request (${Object.values(err.fields)[0]} already exist)` };
    case 'SequelizeForeignKeyConstraintError':
      return { code: 400, message: `Bad request (${err.fields[0]} doesn't exist)` };
    default:
      return { code: 500, message: 'Internal server error' };
  }
}

function build(err) {
  logger.error(err);
  if (err.code || err.statusCode) {
    return { code: err.code || err.statusCode, message: err.message };
  }
  return handleSequelizeError(err);
}

module.exports = {
  build,
};
