function formatWIBToDate(str) {
  const [date, time] = str.split(" ");
  const [day, month, year] = date.split("/");
  const [hour, minute, second] = time.split(":");

  return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}+07:00`);
}

module.exports = { formatWIBToDate }; 