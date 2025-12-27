const { z } = require("zod");

// Format datetime: "DD/MM/YYYY HH:mm:ss"
const reminderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  remind_at: z.string().refine(val => isValidDateTime(val), {
    message: "remind_at must be valid datetime DD/MM/YYYY HH:mm:ss"
  }),
  event_at: z.string().refine(val => isValidDateTime(val), {
    message: "event_at must be valid datetime DD/MM/YYYY HH:mm:ss and greater than now"
  })
});

function isValidDateTime(str) {
  const regex = /^([0-2]\d|3[0-1])\/(0\d|1[0-2])\/\d{4} ([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
  if (!regex.test(str)) return false;

  const [datePart, timePart] = str.split(" ");
  const [dd, mm, yyyy] = datePart.split("/").map(Number);
  const [hh, min, ss] = timePart.split(":").map(Number);
  const date = new Date(yyyy, mm - 1, dd, hh, min, ss);

  return !isNaN(date.getTime()) && date > new Date();
}


module.exports = {
  reminderSchema
};