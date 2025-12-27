const express = require("express");
const { login, refreshAccessToken } = require("../services/auth.service");
const { ok, err } = require("../utils/response");

const router = express.Router();

/**
 * POST /api/session
 * Login
 */
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return err(res, 400, "ERR_BAD_REQUEST", "email and password required");
  }

  const result = login(email, password);

  if (!result) {
    return err(
      res,
      401,
      "ERR_INVALID_CREDS",
      "incorrect username or password"
    );
  }

  return ok(res, result);
});

/**
 * PUT /api/session
 * Untuk refresh Access Token 
 */
router.put("/", (req, res) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return err(
      res,
      401,
      "ERR_INVALID_REFRESH_TOKEN",
      "invalid refresh token"
    );
  }

  const result = refreshAccessToken(token);

  if (!result) {
    return err(
      res,
      401,
      "ERR_INVALID_REFRESH_TOKEN",
      "invalid refresh token"
    );
  }

  return ok(res, result);
});

module.exports = router;
