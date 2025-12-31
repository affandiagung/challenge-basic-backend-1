const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const { reminders } = require("./data/store");
const startReminderJob = require("./jobs/reminder.job");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const app = express();

// Setting reminders to store data , 5 detik setelah
const nowInSeconds = Math.floor(Date.now() / 1000);
reminders.forEach(reminder => {
    reminder.remind_at = nowInSeconds + 5;
    reminder.event_at = nowInSeconds + 1200    
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
startReminderJob();
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes);


const path = require("path");
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", routes);

module.exports = app;
