"use server";

import { db } from "../_lib/prisma";

interface createTaskParamsProps {
  title: string;
  description: string;
}

export const createTask = async (params: createTaskParamsProps) => {
  await db.task.create({
    data: params,
  });
};
