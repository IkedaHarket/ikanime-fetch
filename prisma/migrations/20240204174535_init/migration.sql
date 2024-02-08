/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AnimeState` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `AnimeType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AnimeState_name_key" ON "AnimeState"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AnimeType_name_key" ON "AnimeType"("name");
