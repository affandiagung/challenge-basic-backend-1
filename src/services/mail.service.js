const transporter = require("../config/mail");

async function sendReminderEmail(to, reminder) {
    await transporter.sendMail({
        from: "reminder@app.local",
        to,
        subject: `Reminder: ${reminder.title}`,
        text: `
            Hi,

            This is a reminder for:

            Title: ${reminder.title}
            Description: ${reminder.description}
            Event time: ${reminder.event_at}

            Thanks
            `
    });
}
module.exports = {
    sendReminderEmail
};
