import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Delete todos first
  await prisma.todo.deleteMany();
  // Then delete users
  await prisma.user.deleteMany();

  console.log("Deleted todos and users");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
