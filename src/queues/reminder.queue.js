const { Queue } = require("bullmq");

const connection = {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379
};

const reminderQueue = new Queue("reminder", { connection });

async function addReminderJob(reminder) {
    const delay = reminder.remind_at * 1000 - Date.now();
    try {
        await reminderQueue.add(
            "send-reminder",
            reminder,
            {
                delay: Math.max(delay, 0),
                removeOnComplete: true,
                removeOnFail: true
            }
        );
        console.log(`Reminder id-${reminder.id} added to queue `);
    } catch (err) {
        console.error(err);
    }

}

module.exports = { reminderQueue, addReminderJob };
