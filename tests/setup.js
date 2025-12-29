const express = require("express");
const authRoutes = require("../src/routes/session.routes");
const reminderRoutes = require("../src/routes/reminder.routes");

const app = express();
app.use(express.json());

app.use("/api/session", authRoutes);
app.use("/api/reminders", reminderRoutes);

module.exports = app;