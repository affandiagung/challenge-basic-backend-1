const express = require("express");
const auth = require("../middlewares/auth");
const {
  createReminder,
  listReminders,
  getReminder,
  updateReminder,
  deleteReminder
} = require("../services/reminder.service");
const { ok, err } = require("../utils/response");
const { reminderSchema } = require("../utils/schema");

const router = express.Router();

/**
 * GET /api/reminders?limit=
 */
router.get("/", auth, (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const data = listReminders(req.userId, limit);

  return ok(res, {
    reminders: data,
    limit
  });
});

/**
 * POST /api/reminders
 */
router.post("/", auth, (req, res) => {
  const parseResult = reminderSchema.safeParse(req.body);

  if (!parseResult.success) {
    const messages = parseResult.error.issues.map(e => `${e.path.join(".")}: ${e.message}`);
    return err(res, 400, "ERR_BAD_REQUEST", messages.join("; "));
  }

  const reminder = createReminder(req.userId, parseResult.data);

  return ok(res, reminder);
});


/**
 * GET /api/reminders/:id
 */
router.get("/:id", auth, (req, res) => {
  const reminder = getReminder(req.userId, req.params.id);

  if (!reminder) {
    return err(res, 404, "ERR_NOT_FOUND", "reminder not found");
  }

  return ok(res, reminder);
});

/**
 * PUT /api/reminders/:id
 */
router.put("/:id", auth, (req, res) => {
  const parseResult = reminderSchema.safeParse(req.body);

  if (!parseResult.success) {
    const messages = parseResult.error.issues.map(e => `${e.path.join(".")}: ${e.message}`);
    return err(res, 400, "ERR_BAD_REQUEST", messages.join("; "));
  }

  const reminder = updateReminder(
    req.userId,
    req.params.id,
    req.body
  );

  if (!reminder) {
    return err(res, 404, "ERR_NOT_FOUND", "reminder not found");
  }

  return ok(res, reminder);
});

/**
 * DELETE /api/reminders/:id
 */
router.delete("/:id", auth, (req, res) => {
  const success = deleteReminder(req.userId, req.params.id);

  if (!success) {
    return err(res, 404, "ERR_NOT_FOUND", "reminder not found");
  }

  return ok(res);
});

module.exports = router;
