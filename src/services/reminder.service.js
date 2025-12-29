const { reminders } = require("../data/store");

let reminderIdSeq = reminders.length
    ? Math.max(...reminders.map(r => r.id)) + 1
    : 0;

function createReminder(userId, payload) {
    const reminder = {
        id: reminderIdSeq++,
        userId,
        title: payload.title,
        description: payload.description,
        remind_at: payload.remind_at,
        event_at: payload.event_at,
        is_sent: false
    };

    reminders.push(reminder);
    return reminder;
}

function listReminders(userId, limit = 10) {
    return reminders
        .filter((r) => r.userId === userId)
        .sort((a, b) => a.remind_at - b.remind_at)
        .slice(0, limit);
}

function getReminder(userId, id) {
    return reminders.find(
        (r) => r.id === Number(id) && r.userId === userId
    );
}

function updateReminder(userId, id, payload) {
    const reminder = getReminder(userId, id);
    if (!reminder) return null;

    if (payload.title !== undefined) reminder.title = payload.title;
    if (payload.description !== undefined)
        reminder.description = payload.description;
    if (payload.remind_at !== undefined)
        reminder.remind_at = payload.remind_at;
    if (payload.event_at !== undefined)
        reminder.event_at = payload.event_at;

    return reminder;
}

function deleteReminder(userId, id) {
    const index = reminders.findIndex(
        (r) => r.id === Number(id) && r.userId === userId
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
