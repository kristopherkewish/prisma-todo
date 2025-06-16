import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany({
    include: {
      todos: true,
    },
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Users</h1>
      {users.map((user) => {
        return (
          <div
            key={user.id}
            className="flex flex-col gap-2 border-2 border-gray-300 p-4 rounded-md w-1/4"
          >
            <h2 className="text-lg font-bold bg-gray-200 p-2 rounded-md text-black">
              {user.name}
            </h2>
            <ul className="flex flex-col gap-2">
              {user.todos.map((todo) => (
                <Link
                  href={`/todo/${todo.id}`}
                  key={todo.id}
                  className="text-sm flex flex-col gap-2"
                >
                  <li>
                    <div className="flex justify-between">
                      <span className="font-bold">{todo.title}</span>
                      <span className="text-sm">
                        {todo.completed ? "Completed" : "Not Completed"}
                      </span>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}
