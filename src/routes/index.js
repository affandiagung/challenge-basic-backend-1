// const express = require("express");
// const router = express.Router();

// const apiController = require("../controllers/api.controller");

// router.get("/api", apiController.check);

// module.exports = router;


const express = require("express");
const sessionRoutes = require("./session.routes");
const reminderRoutes = require("./reminder.routes");

const router = express.Router();
router.use("/session", sessionRoutes);
router.use("/reminders", reminderRoutes);

module.exports = router;
