import prisma from "@/lib/prisma";

export default async function TodoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const todo = await prisma.todo.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Todo</h1>
      <div className="flex flex-col gap-2 border-2 border-gray-300 p-4 rounded-md w-1/4">
        <h2 className="text-lg font-bold bg-gray-200 p-2 rounded-md text-black">
          {todo?.title}
        </h2>
        <p className="text-sm">
          {todo?.completed ? "Completed" : "Not Completed"}
        </p>
        <p className="text-sm">
          {todo?.user?.name}
        </p>
      </div>
    </>
  );
}
