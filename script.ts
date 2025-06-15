import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const todo = await prisma.todo.findMany();
  console.log(todo);
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
