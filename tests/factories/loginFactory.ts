import faker from "@faker-js/faker";
import { prisma } from "../../src/database.js";
import bcrypt from "bcrypt";

export async function loginFactory() {
  const user = {
    email: faker.internet.email(),
    password: "123456",
    hashedPassword: bcrypt.hashSync("123456", 10),
  };

  const insertedUser = await prisma.user.create({
    data: {
      email: user.email,
      password: user.hashedPassword,
    },
  });

  return user.email;
}
