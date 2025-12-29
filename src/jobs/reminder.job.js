const { reminders, users } = require("../data/store");
const { sendReminderEmail } = require("../services/mail.service");
const { formatWIBToDate } = require("../utils/time");

function startReminderJob() {
    setInterval(async () => {
        for (const reminder of reminders) {
            if (reminder.is_sent) continue;

            // memastikan agar semua reminder yang lebih dari waktu remider dan belum dikirim  Langsung dikirim
            if (formatWIBToDate(reminder.remind_at) > (new Date())) continue;

            const user = users.find((u) => u.id === reminder.userId);
            if (!user) continue;

            try {
                await sendReminderEmail(user.email, reminder);
                console.log(
                    `📧 Reminder email sent to ${user.email} (reminder id=${reminder.id})`
                );
            } catch (err) {
                console.error(`Failed to send reminder to ${user.email} (reminder id=${reminder.id})`, err);
            }
            reminder.is_sent = true; // gagal atau sukses di seting sebagai true, belum di handling untuk pengiriman semua dianggap sukses
        }
    }, 1000); // pengechekan setiap 1 detik
}

module.exports = startReminderJob;
