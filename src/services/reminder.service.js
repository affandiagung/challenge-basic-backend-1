const { reminders } = require("../data/store");

let reminderIdSeq = reminders.length
    ? Math.max(...reminders.map(r => r.id)) + 1
    : 0;

function createReminder(user_id, payload) {
    const reminder = {
        id: reminderIdSeq++,
        user_id,
        title: payload.title,
        description: payload.description,
        remind_at: payload.remind_at,
        event_at: payload.event_at,
        is_sent: false
    };

    reminders.push(reminder);
    return (({ user_id, is_sent, ...rest }) => rest)(reminder);
}

function listReminders(user_id, limit = 10) {

    return reminders
        .filter((r) => r.user_id === user_id && !r.is_sent)
        .sort((a, b) => a.remind_at - b.remind_at)
        .slice(0, limit)
        .map(({ user_id, is_sent, ...rest }) => rest);
}

function getReminder(user_id, id) {
    const reminder = reminders.find(
        r => r.id === Number(id) && r.user_id === user_id && !r.is_sent
    );

    if (!reminder) return null;

    return (({ user_id, is_sent, ...rest }) => rest)(reminder);
}

function checkReminder(user_id, id) {
    return reminders.find(
        (r) => r.id === Number(id) && r.user_id === user_id && !r.is_sent
    )
}

function updateReminder(user_id, id, payload) {
    const reminder = checkReminder(user_id, id);
    
    if (!reminder) return null;

    if (payload.title !== undefined) reminder.title = payload.title;
    if (payload.description !== undefined)
        reminder.description = payload.description;
    if (payload.remind_at !== undefined)
        reminder.remind_at = payload.remind_at;
    if (payload.event_at !== undefined)
        reminder.event_at = payload.event_at;

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
