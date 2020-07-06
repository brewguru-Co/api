function handleSequelizeError(err) {
  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
      return { code: 400, message: `Bad request (${err.fields.name} already exist)` };
    default:
      return { code: 500, message: 'Internal server error' };
  }
}

function build(err) {
  if (err.code || err.statusCode) {
    return { code: err.code || err.statusCode, message: err.message };
  }
  return handleSequelizeError(err);
}

module.exports = {
  build,
};
