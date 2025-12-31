const { reminders, users } = require("../data/store");
const { sendReminderEmail } = require("../services/mail.service");
const { formatWIBToDate } = require("../utils/time");

function startReminderJob() {
    setInterval(async () => {
        for (const reminder of reminders) {            
            if (reminder.is_sent) continue;
            if ( reminder.remind_at > Math.floor(Date.now() / 1000)) continue;

            const user = users.find((u) => u.user_id === reminder.user_id);
            if (!user) continue;

            try {
                reminder.event_at = new Date(reminder.event_at * 1000);
                await sendReminderEmail(user.email, reminder);
                console.log(
                    `Notif sent to ${user.email} (reminder id=${reminder.id}) at ${new Date()}`
                );
            } catch (err) {
                console.error(`Failed to send reminder to ${user.email} (reminder id=${reminder.id})`, err);
            }
            reminder.is_sent = true; // gagal atau sukses di seting sebagai true, belum di handling untuk pengiriman semua dianggap sukses
        }
    }, 1000); // pengechekan setiap 1 detik
}

module.exports = startReminderJob;
