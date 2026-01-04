const { Worker } = require("bullmq");
const { sendReminderEmail } = require("./src/services/mail.service"); // sesuaikan path
require("dotenv").config({ quiet: true });


const connection = {
  host: process.env.REDIS_HOST || "redis", // "redis" di docker
  port: process.env.REDIS_PORT || 6379
};

const API_KEY = process.env.API_KEY

console.log("Worker is starting...");

const worker = new Worker(
  "reminder",
  async (job) => {

    try {
      await sendReminderEmail(job.data);
      const response = await fetch(`http://reminder-api:${process.env.PORT}/reminders/${job.data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY
        },
        body: JSON.stringify({ is_sent: true, user_id: job.data.user_id })
      })

      if (!response.ok) {
        throw new Error(`Worker Failed to update reminder ${job.data.id}`);
      }

    } catch (err) {
      throw err;
    }
  },
  { connection }
);

worker.on("completed", job => console.log(`Job ${job.id} completed`));
worker.on("failed", (job, err) => console.error(`Job ${job.data.id} failed`, err));
worker.on("error", err => console.error("Worker internal error:", err));

console.log("Worker running and waiting for jobs...");
