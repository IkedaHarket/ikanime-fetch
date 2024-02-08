/*
  Warnings:

  - Added the required column `nameServer` to the `AnimeEpisodeVideoOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnimeEpisodeVideoOption" ADD COLUMN     "nameServer" TEXT NOT NULL;
