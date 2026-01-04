const transporter = require("../config/mail");
const { reminders } = require("../data/store");
const { getReminder } = require("./reminder.service");

async function sendReminderEmail(reminder) {
    await transporter.sendMail({
        from: "reminder@app.local",
        to: reminder.email,
        subject: `Reminder: ${reminder.title}`,
        text: `
            Hi,

            This is a reminder for:

            Title: ${reminder.title}
            Description: ${reminder.description}
            Event time: ${new Date(reminder.event_at)}

            Thanks
            `
    });
}

module.exports = {
    sendReminderEmail
};
