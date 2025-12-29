const request = require("supertest");
const app = require("./setup");

let accessToken;

beforeAll(async () => {
  // login dulu untuk dapat access token
  const res = await request(app)
    .post("/api/session")
    .send({ email: "affandi@gmail.com", password: "affandi789" });
  accessToken = res.body.data.accessToken;

});

describe("Reminder API", () => {
  let reminderId;

  it("should create a new reminder", async () => {
    const res = await request(app)
      .post("/api/reminders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "Test Reminder",
        description: "Reminder for testing",
        remind_at: "30/12/2026 12:00:00",
        event_at: "31/12/2026 12:00:00"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    reminderId = res.body.data.id;
  });

  it("should get the created reminder", async () => {
    const res = await request(app)
      .get(`/api/reminders/${reminderId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(reminderId);
  });

  it("should delete the reminder", async () => {
    const res = await request(app)
      .delete(`/api/reminders/${reminderId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
