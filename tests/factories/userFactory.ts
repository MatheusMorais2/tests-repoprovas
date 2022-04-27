import faker from "@faker-js/faker";
import { prisma } from "../../src/database.js";
import bcrypt from "bcrypt";

export async function createUser() {
  const user = {
    email: faker.internet.email(),
    password: bcrypt.hashSync("123456", 10),
  };

  /*   const insertedUser = await prisma.user.create({
    data: {
      email: user.email,
      password: user.hashedPassword,
    },
  }); */

  return user;
}
