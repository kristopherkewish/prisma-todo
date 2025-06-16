import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export default async function EditTodo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const users = await prisma.user.findMany();

  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    notFound();
  }

  async function editPost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const userId = formData.get("userId") as string;
    const completed = formData.get("completed") === "on";

    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        userId: userId ?? undefined,
        completed,
      },
    });

    revalidatePath("/");
    redirect("/");
  }

  async function deleteTodo() {
    "use server";

    await prisma.todo.delete({
      where: { id },
    });

    revalidatePath("/");
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-2 border-2 border-gray-300 p-4 rounded-md w-1/4">
      <h1 className="text-2xl font-bold mb-6">Edit Todo</h1>
      <form action={editPost} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-100 text-black p-2"
            placeholder="Enter todo title"
            defaultValue={todo.title}
          />
        </div>
        <div>
          <label htmlFor="userId" className="block text-sm font-medium">
            User
          </label>
          <select
            id="userId"
            name="userId"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-100 text-black p-2"
            defaultValue={todo.userId ?? ""}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            defaultChecked={todo.completed}
          />
          <label htmlFor="completed" className="text-sm font-medium">
            Completed
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Update Todo
        </button>
        <button
          type="button"
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={deleteTodo}
        >
          Delete Todo
        </button>
      </form>
    </div>
  );
}
