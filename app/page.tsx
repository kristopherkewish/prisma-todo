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
              <Link href={`/user/${user.id}`}>{user.name}</Link>
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
      <div className="flex gap-2 w-1/4">
        <Link
          href="/user/new"
          className="w-full text-sm bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Create User
        </Link>
        <Link
          href="/todo/new"
          className="w-full text-sm bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Create Todo
        </Link>
      </div>
    </>
  );
}
