-- CreateEnum
CREATE TYPE "LogSeverityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "severity" "LogSeverityLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
