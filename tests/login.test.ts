import supertest from "supertest";
import app from "../src/app.js";
import { loginFactory } from "./factories/loginFactory.js";
import { createUser } from "./factories/userFactory.js";

describe("POST /sign-in", () => {
  it("should answer with status 200 when data is valid", async () => {
    const user = await createUser();
    const response = await supertest(app).post("/sign-up").send(user);
    expect(response.status).toBe(200);
  });

  it("should return status 422 when request is bad", async () => {
    const data = { password: "123" };

    const response = await supertest(app).post("/sign-in").send(data);
    expect(response.status).toBe(422);
  });

  it("should return status 401 when password is wrong", async () => {
    const userEmail = await loginFactory();
    const response = await supertest(app)
      .post("/sign-in")
      .send({ email: userEmail, password: "12345" });
    expect(response.status).toBe(422);
  });
});
