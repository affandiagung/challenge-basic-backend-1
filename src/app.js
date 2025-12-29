const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const { reminders } = require("./data/store");
const startReminderJob = require("./jobs/reminder.job");

const app = express();

// Setting reminders to store data , 20 detik setelah
const nowInSeconds = Math.floor(Date.now() / 1000);
reminders.forEach(reminder => {
    const remind_at = nowInSeconds + 20;
    const event_at = nowInSeconds + 1200

    reminder.remind_at = new Date(remind_at * 1000).toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).replace(",", "")
        .replace(/\./g, ":");

    reminder.event_at = new Date(event_at * 1000).toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).replace(",", "")
        .replace(/\./g, ":");
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
startReminderJob();
app.use(routes);



app.use("/api", routes);

module.exports = app;
