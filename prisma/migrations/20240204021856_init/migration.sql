/*
  Warnings:

  - Added the required column `name` to the `AnotherAnimeName` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnotherAnimeName" ADD COLUMN     "name" TEXT NOT NULL;
