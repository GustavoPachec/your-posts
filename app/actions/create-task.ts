"use server";

import { z } from "zod";
import { db } from "@/lib/prisma";

const createTaskSchema = z.object({
  title: z.string().min(3, "Title is required!"),
  description: z.string().min(3, "Description is required!"),
  status: z.enum(["NOT_INITIALIZED", "PENDING", "COMPLETED"]),
});

interface createTaskProps {
  title: string;
  description: string;
  status: "NOT_INITIALIZED" | "PENDING" | "COMPLETED";
}

export const createTask = async (params: createTaskProps) => {
  try {
    const validatedData = createTaskSchema.parse(params);

    await db.task.create({
      data: validatedData,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};
