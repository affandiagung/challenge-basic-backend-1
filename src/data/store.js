const users = [
  { id: 1, email: "affandi@gmail.com", password: "affandi789", name: "Affandi" },
  { id: 2, email: "agung@mail.com", password: "agung789!", name: "Agung" }
];


const accessTokens = new Map();
const refreshTokens = new Map();

// Dummy data untuk reminder
const reminders = [{
  "id": 1,
  "userId": 1,
  "title": "Meeting with Tono",
  "description": "Discuss about new project related to new system",
  "remind_at": null,
  "event_at": null,
  "is_sent": false
},
{
  "id": 2,
  "userId": 2,
  "title": "Meeting with Jon",
  "description": "Discuss about new update on project",
  "remind_at": null,
  "event_at": null,
  "is_sent": false
}];

module.exports = {
  users,
  accessTokens,
  refreshTokens,
  reminders
};
