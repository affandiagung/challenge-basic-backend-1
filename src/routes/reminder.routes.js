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
const { reminderSchema, updateReminderSchema } = require("../utils/schema");
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Reminders
 *   description: Manage User reminders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reminder:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - remind_at
 *         - event_at
 *       properties:
 *         title:
 *           type: string
 *           example: "Meeting with Bob"
 *         description:
 *           type: string
 *           example: "Discuss about new project"
 *         remind_at:
 *           type: number
 *           format: Unix TimeStamp ( 10 Digit ) 
 *           example: 1735689600
 *         event_at:
 *           type: number
 *           format: Unix TimeStamp
 *           example: 1735689600
 */

/**
 * @swagger
 * /reminders:
 *   get:
 *     summary: List upcoming reminders
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Maximum number of reminders to return
 *     responses:
 *       200:
 *         description: List of reminders
 */
router.get("/", auth, (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const data = listReminders(req.user_id, limit);

  return ok(res, {
    reminders: data,
    limit
  });
});

/**
 * @swagger
 * /reminders:
 *   post:
 *     summary: Create a new reminder
 *     tags: [Reminders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reminder'
 *     responses:
 *       200:
 *         description: Reminder created successfully
 */

router.post("/", auth, (req, res) => {
  const parseResult = reminderSchema.safeParse(req.body);

  if (!parseResult.success) {
    const messages = parseResult.error.issues.map(e => `${e.path.join(".")}: ${e.message}`);
    return err(res, 400, "ERR_BAD_REQUEST", messages.join("; "));
  }

  const reminder = createReminder(req.user_id, parseResult.data);

  return ok(res, reminder);
});


/**
 * @swagger
 * /reminders/{id}:
 *   get:
 *     summary: Get reminder by ID
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the reminder
 *     responses:
 *       200:
 *         description: Reminder retrieved successfully
 *       404:
 *         description: Reminder not found
 * 
 */

router.get("/:id", auth, (req, res) => {
  const reminder = getReminder(req.user_id, req.params.id);

  if (!reminder) {
    return err(res, 404, "ERR_NOT_FOUND", "reminder not found");
  }

  return ok(res, reminder);
});

/**
 * @swagger
 * /reminders/{id}:
 *   put:
 *     summary: Update reminder by ID
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the reminder to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reminder'
 *     responses:
 *       200:
 *         description: Reminder updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Reminder not found
 */

router.put("/:id", auth, (req, res) => {
  const parseResult = updateReminderSchema.safeParse(req.body);

  if (!parseResult.success) {
    const messages = parseResult.error.issues.map(e => `${e.path.join(".")}: ${e.message}`);
    return err(res, 400, "ERR_BAD_REQUEST", messages.join("; "));
  }

  const reminder = updateReminder(
    req.user_id,
    req.params.id,
    req.body
  );

  if (!reminder) {
    return err(res, 404, "ERR_NOT_FOUND", "reminder not found");
  }

  return ok(res, reminder);
});

/**
 * @swagger
 * /reminders/{id}:
 *   delete:
 *     summary: Delete reminder by ID
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the reminder to delete
 *     responses:
 *       200:
 *         description: Reminder deleted successfully
 *       404:
 *         description: Reminder not found
 */
router.delete("/:id", auth, (req, res) => {
  const success = deleteReminder(req.user_id, req.params.id);

  if (!success) {
    return err(res, 404, "ERR_NOT_FOUND", "reminder not found");
  }

  return ok(res);
});

module.exports = router;
