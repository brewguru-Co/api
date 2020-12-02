const jwt = require('jsonwebtoken');

function generateToken(payload) {
  return new Promise(
    (resolve, reject) => {
      jwt.sign(payload, 'brewguru', { expiresIn: '30d' }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    },
  );
}

function decodeToken(token) {
  return new Promise(
    (resolve, reject) => {
      jwt.verify(token, 'brewguru', (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    },
  );
}

module.exports = {
  generateToken,
  decodeToken,
};
