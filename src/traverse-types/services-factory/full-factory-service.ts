import { PrismaClient } from "@prisma/client";
import { CreateLogUseCase } from "../../log";
import { Prisma } from "../../core";
import { ServiceFactory } from "../domain/base";
import * as IServices from "../domain/services";
import * as AnimeState from "../../anime-state"
import * as AnimeType from "../../anime-type"
import * as Anime from "../../anime"
import * as AnotherAnimeName from "../../another-anime-name"
import * as AnimeEpisode from "../../anime-episode"
import * as EpisodeVideoOption from "../../anime-episode-video-option"
import * as AnimeCategory from '../../anime-category'
import * as Services from "../services"

export class FullServiceFactory extends ServiceFactory{

    private readonly prismaClient: PrismaClient

    constructor(
        private readonly createLog: CreateLogUseCase
    ){
        super();
        this.prismaClient = Prisma.getInstance().prismaClient
    }

    createAnimeStateService(): IServices.IAnimeStateService {
        const animeStateDataSource = new AnimeState.AnimeStatePostgresDatasource({ createLog: this.createLog, prismaClient: this.prismaClient })
        const animeStateRepository = new AnimeState.AnimeStateRepositoryImpl(animeStateDataSource)
        const createAnimeState = new AnimeState.CreateAnimeState(animeStateRepository)
        const findAnimeState = new AnimeState.FindAnimeState(animeStateRepository)
        return new Services.AnimeStateService({createLog: this.createLog,createAnimeState,findAnimeState})
    }


    createAnimetypeService(): IServices.IAnimeTypeService {
        const animeTypeDataSource = new AnimeType.AnimeTypePostgresDatasource({ createLog: this.createLog, prismaClient: this.prismaClient })
        const animeTypeRepository = new AnimeType.AnimeTypeRepositoryImpl(animeTypeDataSource)
        const createAnimeType = new AnimeType.CreateAnimeType(animeTypeRepository)
        const findAnimeType = new AnimeType.FindAnimeType(animeTypeRepository)
        return new Services.AnimeTypeService({ createLog: this.createLog, createAnimeType, findAnimeType  })
    }


    createAnimeService(): IServices.IAnimeService {
        const animeDatasource = new Anime.AnimePostgresDatasource({ createLog: this.createLog, prismaClient: this.prismaClient })
        const animeRepository = new Anime.AnimeRepositoryImpl(animeDatasource)
        const createAnime = new Anime.CreateAnime(animeRepository)
        const findAnime = new Anime.FindAnime(animeRepository)
        return new Services.AnimeService({createLog: this.createLog, createAnime, findAnime })
    }


    createAnotherAnimeService(): IServices.IAnotherAnimeNameService {
        const anotherAnimeNameDatasource = new AnotherAnimeName.AnotherAnimeNamePostgresDatasource({createLog: this.createLog, prismaClient: this.prismaClient})
        const anotherAnimeNameRepository = new AnotherAnimeName.AnotherAnimeNameRepositoryImpl(anotherAnimeNameDatasource)
        const createAnotherAnimeName = new AnotherAnimeName.CreateAnotherAnimeName(anotherAnimeNameRepository)
        const findAnotherAnimeName = new AnotherAnimeName.FindAnotherAnimeName(anotherAnimeNameRepository)
        return new Services.AnotherAnimeNameService({createLog: this.createLog, createAnotherAnimeName, findAnotherAnimeName})
    }


    createAnimeEpisodeService(): IServices.IAnimeEpisodeService {
        const animeEpisodeDatasource = new AnimeEpisode.AnimeEpisodePostgresDatasource({createLog: this.createLog, prismaClient: this.prismaClient})
        const animeEpisodeRepository = new AnimeEpisode.AnimeEpisodeRepositoryImpl(animeEpisodeDatasource)
        const createAnimeEpisode = new AnimeEpisode.CreateAnimeEpisode(animeEpisodeRepository)
        const findAnimeEpisode = new AnimeEpisode.FindAnimeEpisode(animeEpisodeRepository)
        return new Services.AnimeEpisodeService({createLog: this.createLog,createAnimeEpisode,findAnimeEpisode})
    }


    createAnimeEpisodeVideoOptionService(): IServices.IAnimeEpisodeVideoOptionService {
        const animeEpisodeVideoDatasource = new EpisodeVideoOption.AnimeEpisodeVideoOptionPostgresDatasource({createLog: this.createLog,prismaClient: this.prismaClient})
        const animeEpisodeVideoRepository = new EpisodeVideoOption.AnimeEpisodeVideoOptionRepositoryImpl(animeEpisodeVideoDatasource)
        const createAnimeEpisodeVideoOption = new EpisodeVideoOption.CreateAnimeEpisodeVideoOption(animeEpisodeVideoRepository)
        const findAnimeEpisodeVideoOption = new EpisodeVideoOption.FindAnimeEpisodeVideoOption(animeEpisodeVideoRepository)
        return new Services.AnimeEpisodeVideoOptionService({
            createAnimeEpisodeVideoOption,createLog: this.createLog,findAnimeEpisodeVideoOption})
    }


    createAnimeCategoryService(): IServices.IAnimeCategoryService {
        const animeCategoryDatasource = new AnimeCategory.AnimeCategoryPostgresDatasource({createLog: this.createLog,prismaClient: this.prismaClient})
        const animeCategoryHubDatasource = new AnimeCategory.AnimeCategoryHubPostgresDatasource({
            createLog: this.createLog, prismaClient: this.prismaClient
        })
        const animeCategoryRepository = new AnimeCategory.AnimeCategoryRepositoryImpl(animeCategoryDatasource)
        const animeCategoryHubRepository = new AnimeCategory.AnimeCategoryHubRepositoryImpl(animeCategoryHubDatasource)
        const createAnimeCategory = new AnimeCategory.CreateAnimeCategory(animeCategoryRepository)
        const findAnimeCategory = new AnimeCategory.FindAnimeCategory(animeCategoryRepository)
        const createAnimeCategoryHub = new AnimeCategory.CreateAnimeCategoryHub(animeCategoryHubRepository)
        const findAnimeCategoryHub = new AnimeCategory.FindAnimeCategoryHub(animeCategoryHubRepository)
        return new Services.AnimeCategoryService({
            createAnimeCategory ,
            createLog: this.createLog, 
            findAnimeCategory,
            createAnimeCategoryHub,
            findAnimeCategoryHub
        })
    }

}