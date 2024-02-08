/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AnimeCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AnimeCategory_name_key" ON "AnimeCategory"("name");
