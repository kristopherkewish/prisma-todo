import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function NewTodo() {
  const users = await prisma.user.findMany();

  async function createPost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const userId = formData.get("userId") as string;

    await prisma.todo.create({
      data: {
        title,
        userId,
      },
    });

    revalidatePath("/");
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-2 border-2 border-gray-300 p-4 rounded-md w-1/4">
      <h1 className="text-2xl font-bold mb-6">Create New Todo</h1>
      <form action={createPost} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-100 text-black p-2"
            placeholder="Enter todo title"
          />
        </div>
        <div>
          <label
            htmlFor="userId"
            className="block text-sm font-medium"
          >
            User
          </label>
          <select
            id="userId"
            name="userId"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-100 text-black p-2"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Create Todo
        </button>
      </form>
    </div>
  );
}
