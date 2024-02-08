/*
  Warnings:

  - The primary key for the `AnimeCategoryHub` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AnimeCategoryHub` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnimeCategoryHub" DROP CONSTRAINT "AnimeCategoryHub_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "AnimeCategoryHub_pkey" PRIMARY KEY ("animeId", "animeCategoryId");
