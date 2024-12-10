/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params; // Pegue o ID do contexto
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
