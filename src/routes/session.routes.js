const express = require("express");
const { login, refreshAccessToken } = require("../services/auth.service");
const { ok, err } = require("../utils/response");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Login User
 */

/**
 * @swagger
 * /session:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: affandi@gmail.com
 *               password:
 *                 type: string
 *                 example: affandi789
 *     responses:
 *       200:
 *         description: Login success
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
 * @swagger
 * /session:
 *   put:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     description: Replace expired access token with a new one using refresh token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer <refresh_token>
 *         description: The refresh token obtained during login
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
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
