import { prisma } from "../src/database.js";
import bcrypt from "bcrypt";

async function main() {
  await prisma.user.upsert({
    where: { email: "123@gmail.com" },
    update: {},
    create: {
      email: "123@gmail.com",
      password: bcrypt.hashSync("123", 10),
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
