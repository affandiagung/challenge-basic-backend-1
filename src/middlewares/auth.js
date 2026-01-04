const { verifyAccessToken } = require("../services/auth.service");
const { err } = require("../utils/response");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return err(res, 401, "ERR_UNAUTHORIZED", "missing access token");
  }

  const data = verifyAccessToken(token);

  if (!data) {
    return err(res, 401, "ERR_UNAUTHORIZED", "invalid or expired access token");
  }

  req.user_id = data.user_id;
  req.email = data.email


  next();
}

module.exports = authMiddleware;
