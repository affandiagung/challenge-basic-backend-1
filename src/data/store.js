const users = [
  { user_id: 1, email: "affandi@gmail.com", password: "affandi789", name: "Affandi" },
  { user_id: 2, email: "agung@gmail.com", password: "agung789", name: "Agung" }
];

const accessTokens = new Map();
const refreshTokens = new Map();

// Dummy data untuk reminder
const reminders = [{
  "id": 1,
  "user_id": 1,
  "title": "Meeting with Tono",
  "description": "Discuss about new project related to new system",
  "remind_at": null,
  "event_at": null,
  "is_sent": false
},
{
  "id": 2,
  "user_id": 2,
  "title": "Workout at GBK",
  "description": "Running practice for fitness",
  "remind_at": null,
  "event_at": null,
  "is_sent": false
}];


function addReminder(reminder) {
  reminders.push(reminder);
}

function getReminderId(user, id) {
  return reminders.find(r => r.id === Number(id) && r.user_id === user && !r.is_sent);
}

function getLastId(reminders) {
  return reminders.length > 0 ? reminders[reminders.length - 1].id : 2;
}

function updateReminder(id, data) {
  const index = reminders.findIndex(r => r.id === id);
  if (index !== -1) {
    reminders[index] = { ...reminders[index], ...data };
  }
}

function getAllReminders() {
  return reminders.filter(r => !r.is_sent);
}


module.exports = {
  users,
  accessTokens,
  refreshTokens,
  reminders,
  getReminderId,
  updateReminder,
  addReminder,
  getAllReminders,
  getLastId
};
