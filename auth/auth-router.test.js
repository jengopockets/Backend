const db = require("../database/dbConfig.js");
const request = require("supertest");
const server = require("../api/server.js");

const { add } = require("../users/users-model.js");

describe("users-model", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("add()", () => {
    it("should add the user to the database", async () => {
      await add({ username: "Username", password: "Password" });
      const user = await db("users");
      expect(user).toHaveLength(1);
    });
  });
});

describe("auth-router", function() {
  describe("POST /login", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });
    it("should login user", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "test" })
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});
