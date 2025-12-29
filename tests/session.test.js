const request = require("supertest");
const app = require("./setup"); // app Express yang sudah di-setup

describe("Auth API", () => {
  let refreshToken;

  /**
   * POST /api/session -> Login
   */
  describe("POST /api/session", () => {
    it("should login successfully with valid credentials", async () => {
      const res = await request(app)
        .post("/api/session")
        .send({ email: "affandi@gmail.com", password: "affandi789" });

      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.data).toHaveProperty("accessToken");
      expect(res.body.data).toHaveProperty("refreshToken");

      // simpan refresh token untuk testing PUT
      refreshToken = res.body.data.refreshToken;
    });

    it("should return 401 for invalid credentials", async () => {
      const res = await request(app)
        .post("/api/session")
        .send({ email: "affandi@gmail.com", password: "wrongpassword" });

      expect(res.statusCode).toBe(401);
      expect(res.body.ok).toBe(false);
      expect(res.body.err).toBe("ERR_INVALID_CREDS");
    });

    it("should return 400 if email or password missing", async () => {
      const res = await request(app).post("/api/session").send({ email: "affandi@gmail.com" });

      expect(res.statusCode).toBe(400);
      expect(res.body.ok).toBe(false);
      expect(res.body.err).toBe("ERR_BAD_REQUEST");
    });
  });

  /**
   * PUT /api/session -> Refresh access token
   */
  describe("PUT /api/session", () => {
    it("should refresh access token with valid refresh token", async () => {
      const res = await request(app)
        .put("/api/session")
        .set("Authorization", `Bearer ${refreshToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.data).toHaveProperty("accessToken");
    });

    it("should return 401 if refresh token is missing", async () => {
      const res = await request(app).put("/api/session");

      expect(res.statusCode).toBe(401);
      expect(res.body.ok).toBe(false);
      expect(res.body.err).toBe("ERR_INVALID_REFRESH_TOKEN");
    });

    it("should return 401 if refresh token is invalid", async () => {
      const res = await request(app)
        .put("/api/session")
        .set("Authorization", "Bearer invalidtoken");

      expect(res.statusCode).toBe(401);
      expect(res.body.ok).toBe(false);
      expect(res.body.err).toBe("ERR_INVALID_REFRESH_TOKEN");
    });
  });
});
