-- CreateTable
CREATE TABLE "AnimeType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnimeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeState" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnimeState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anime" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nextEpisode" TIMESTAMP(3) NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "stateId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "uniqueName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnotherAnimeName" (
    "id" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnotherAnimeName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnimeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeCategoryHub" (
    "id" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "animeCategoryId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnimeCategoryHub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeEpisode" (
    "id" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnimeEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeEpisodeVideoOption" (
    "id" TEXT NOT NULL,
    "animeEpisodeId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnimeEpisodeVideoOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Anime_uniqueName_key" ON "Anime"("uniqueName");

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "AnimeState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AnimeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnotherAnimeName" ADD CONSTRAINT "AnotherAnimeName_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeCategoryHub" ADD CONSTRAINT "AnimeCategoryHub_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeCategoryHub" ADD CONSTRAINT "AnimeCategoryHub_animeCategoryId_fkey" FOREIGN KEY ("animeCategoryId") REFERENCES "AnimeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeEpisode" ADD CONSTRAINT "AnimeEpisode_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeEpisodeVideoOption" ADD CONSTRAINT "AnimeEpisodeVideoOption_animeEpisodeId_fkey" FOREIGN KEY ("animeEpisodeId") REFERENCES "AnimeEpisode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
