const { decodeToken } = require('../helpers/token');

const tokenMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next();

  try {
    const decoded = await decodeToken(token);

    req.user = {
      id: decoded.id,
    };
  } catch (e) {
    req.user = null;
  }

  return next();
};

module.exports = tokenMiddleware;
