const crypto = require('crypto');

function hash(value) {
  return crypto.createHmac('sha256', 'brewguru').update(value).digest('hex');
}

module.exports = {
  hash,
};
