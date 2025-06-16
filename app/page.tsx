import prisma from "@/lib/prisma";

export default async function Home() {
  const todos = await prisma.user.findMany({
    include: {
      todos: true,
    },
  });
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      <ul className="flex flex-col gap-2">
        {todos.map((user) => (
          <li key={user.id} className="text-lg flex flex-col gap-2">
            <h2 className="text-lg font-bold">{user.name}</h2>
            <ul className="flex flex-col gap-2">
              {user.todos.map((todo) => (
                <li key={todo.id} className="text-sm flex flex-col gap-2">
                  <span className="font-bold">{todo.title}</span>
                  <span className="text-sm">{todo.completed ? "Completed" : "Not Completed"}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
