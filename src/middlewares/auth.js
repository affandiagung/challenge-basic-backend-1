const { verifyAccessToken } = require("../services/auth.service");
const { err } = require("../utils/response");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return err(res, 401, "ERR_UNAUTHORIZED", "missing access token");
  }

  const userId = verifyAccessToken(token);

  if (!userId) {
    return err(res, 401, "ERR_UNAUTHORIZED", "invalid or expired access token");
  }

  req.user_id = userId;
  next();
}

module.exports = authMiddleware;
