"use server";

import { Status } from "@prisma/client";
import { db } from "../_lib/prisma";

interface createTaskParamsProps {
  title: string;
  status: Status;
  description: string;
}

export const createTask = async (params: createTaskParamsProps) => {
  await db.task.create({
    data: params,
  });
};
