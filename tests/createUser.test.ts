import { prisma } from "../src/database.js";
import supertest from "supertest";
import app from "../src/app.js";
import { createUser } from "./factories/userFactory.js";

describe("POST /sign-up", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should answer with status 201 when data is valid", async () => {
    const user = await createUser();
    const response = await supertest(app).post("/sign-up").send(user);

    const dbUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    expect(response.status).toBe(201);
    expect(dbUser).not.toBeNull();
  });

  it("should return with status 422 when bad request", async () => {
    const user = { password: "123" };

    const response = await supertest(app).post("sign-up").send(user);
    expect(response.status).toBe(422);
  });
});
