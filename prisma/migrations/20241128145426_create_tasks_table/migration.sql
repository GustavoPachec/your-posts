-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_INITIALIZED', 'PENDING', 'COMPLETED');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NOT_INITIALIZED',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
