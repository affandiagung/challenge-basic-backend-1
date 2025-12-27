const users = [
  { id: 1, email: "affandi@gmail.com", password: "affandi789", name: "Affandi" },
  { id: 2, email: "agung@mail.com", password: "agung789!", name: "Agung" }
];


const accessTokens = new Map();
const refreshTokens = new Map();

const reminders = [{
  "id": 1,
  "userId" :1 ,
  "title": "Meeting with Bob",
  "description": "Discuss about new project related to new system",
  "remind_at": null,
  "event_at": null,
  "is_sent" : false
}];

module.exports = {
  users,
  accessTokens,
  refreshTokens,
  reminders
};
