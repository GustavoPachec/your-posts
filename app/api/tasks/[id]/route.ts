import { NextResponse } from "next/server";
import { db } from "@/app/_lib/prisma";

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const data = await req.json();

  try {
    const updatedTask = await db.task.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await db.task.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Tarefa excluída com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
