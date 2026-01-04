const { reminders, getLastId, getAllReminders, getReminderId } = require("../data/store");
const { addReminderJob } = require("../queues/reminder.queue");



async function createReminder(user_id, payload) {

    let reminderIdSeq = getLastId(reminders) + 1

    const reminder = {
        id: reminderIdSeq,
        user_id,
        title: payload.title,
        description: payload.description,
        remind_at: payload.remind_at,
        event_at: payload.event_at,
        is_sent: false
    };

    reminders.push(reminder);
    reminder.email = payload.email
    await addReminderJob(reminder);

    return (({ user_id, is_sent, ...rest }) => rest)(reminder);
}

function listReminders(user_id, limit = 10) {
    return getAllReminders()
        .filter((r) => r.user_id === user_id && !r.is_sent)
        .sort((a, b) => a.remind_at - b.remind_at)
        .slice(0, limit)
        .map(({ user_id, is_sent, ...rest }) => rest);
}

function getReminder(user_id, id) {
    const reminder = getReminderId(user_id, id);

    if (!reminder) return null;
    return (({ user_id, is_sent, ...rest }) => rest)(reminder);
}

function updateReminder(user_id, id, payload) {
    const reminder = getReminderId(user_id, id);
    if (!reminder) return null;

    payload.title !== undefined && (reminder.title = payload.title);
    payload.description !== undefined && (reminder.description = payload.description);
    payload.remind_at !== undefined && (reminder.remind_at = payload.remind_at);
    payload.event_at !== undefined && (reminder.event_at = payload.event_at);
    payload.is_sent !== undefined && (reminder.is_sent = payload.is_sent);

    return (({ user_id, is_sent, ...rest }) => rest)(reminder);
}

function deleteReminder(user_id, id) {
    const index = reminders.findIndex(
        (r) => r.id === Number(id) && r.user_id === user_id
    );

    if (index === -1) return false;

    reminders.splice(index, 1);
    return true;
}

module.exports = {
    createReminder,
    listReminders,
    getReminder,
    updateReminder,
    deleteReminder
};
