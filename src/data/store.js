const users = [
  { id: 1, email: "affandi@gmail.com", password: "affandi789!", name: "Affandi" },
  { id: 2, email: "agung@mail.com", password: "agung789!", name: "Agung" }
];

const accessTokens = new Map(); 
const refreshTokens = new Map(); 

const reminders = [];

module.exports = {
  users,
  accessTokens,
  refreshTokens,
  reminders
};
