import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export default async function EditTodo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    notFound();
  }

  async function editUser(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    revalidatePath("/");
    redirect("/");
  }

  async function deleteUser() {
    "use server";

    await prisma.user.delete({
      where: { id }
    });

    revalidatePath("/");
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-2 border-2 border-gray-300 p-4 rounded-md w-1/4">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
      <form action={editUser} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-100 text-black p-2"
            placeholder="Enter user name"
            defaultValue={user.name}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Update User
        </button>
        <button
          type="button"
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={deleteUser}
        >
          Delete User
        </button>
      </form>
    </div>
  );
}
