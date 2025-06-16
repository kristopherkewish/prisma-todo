import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      todos: true,
    },
  });

  if (!user) {
    notFound();
  }

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
        <Link
          href={`/user/${id}/edit`}
          className="text-sm bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Edit
        </Link>
      </div>
  );
}
