import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Create a user and assign a todo to the user
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@doe.com",
      password: "123456",
      todos: {
        create: [
          {
            title: "Buy groceries",
          },
          {
            title: "Pay bills",
          },
        ],
      },
    },
  });

  // Create a second user and assign a couple todos to the second user
  const user2 = await prisma.user.create({
    data: {
      name: "Jane Doe",
      email: "jane@doe.com",
      password: "123456",
      todos: {
        create: [
          {
            title: "Buy fuel",
          },
          {
            title: "Walk the dog",
          },
        ],
      },
    },
  });

  console.log("User 1:", user1);
  console.log("User 2:", user2);
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
