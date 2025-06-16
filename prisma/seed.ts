import { PrismaClient, Prisma } from "../generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "hashed_password_123", // In a real app, this should be properly hashed
    todos: {
      create: [
        {
          title: "Learn Prisma",
          completed: true,
        },
        {
          title: "Build a Todo App",
          completed: false,
        },
      ],
    },
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "hashed_password_456", // In a real app, this should be properly hashed
    todos: {
      create: [
        {
          title: "Review pull requests",
          completed: false,
        },
        {
          title: "Update documentation",
          completed: true,
        },
        {
          title: "Plan next sprint",
          completed: false,
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
