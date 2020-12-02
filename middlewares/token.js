const { decodeToken, generateToken } = require('../helpers/token');

const tokenMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next();

  try {
    const decoded = await decodeToken(token);

    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 2) {
      const { _id, id } = decoded;
      const freshToken = await generateToken({ _id, id });
      res.cookie('access_token', freshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    }
    req.user = {
      id: decoded.id,
    };
  } catch (e) {
    req.user = null;
  }

  return next();
};

module.exports = tokenMiddleware;
