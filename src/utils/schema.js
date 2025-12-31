const { z } = require("zod");


const reminderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  remind_at: z
    .number()
    .int()
    .refine(val => val > Math.floor(Date.now() / 1000), {
      message: "remind_at must be a valid UNIX timestamp (seconds) and greater than now"
    }),
  event_at: z
    .number()
    .int()
    .refine(val => val > Math.floor(Date.now() / 1000), {
      message: "remind_at must be a valid UNIX timestamp (seconds) and greater than now"
    })
});

const updateReminderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  remind_at: z
    .number()
    .int()
    .refine(val => val > Math.floor(Date.now() / 1000), {
      message: "remind_at must be a valid UNIX timestamp (seconds) and greater than now"
    }),
  event_at: z
    .number()
    .int()
    .refine(val => val > Math.floor(Date.now() / 1000), {
      message: "remind_at must be a valid UNIX timestamp (seconds) and greater than now"
    })
}).partial();




module.exports = {
  reminderSchema,
  updateReminderSchema
};