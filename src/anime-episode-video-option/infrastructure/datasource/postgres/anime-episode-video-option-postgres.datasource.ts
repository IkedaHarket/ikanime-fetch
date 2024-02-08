import { PrismaClient } from "@prisma/client";

import { CreateLogDto, CreateLogUseCase, LogSeverityLevel } from "../../../../log";
import { Criteria } from "../../../domain/base";
import { AnimeEpisodeVideoOptionDatasource } from "../../../domain/datasource";
import { AnimeEpisodeVideoOptionConverter, AnimeEpisodeVideoOptionConverterPostgres } from "./adapters/anime-episode-video-option-converter.inf-adapter";
import { AnimeEpisodeVideoOption } from "../../../domain/entity";
import { CreateAnimeEpisodeVideoOptionDto } from "../../../domain/dto";

interface AnimeEpisodeVideoOptionPostgresDatasourceProps{
    prismaClient: PrismaClient
    createLog: CreateLogUseCase
    animeEpisodeVideoOptionConvert?: AnimeEpisodeVideoOptionConverter
}

export class AnimeEpisodeVideoOptionPostgresDatasource implements AnimeEpisodeVideoOptionDatasource{

    private readonly prismaClient: PrismaClient
    private readonly createLog: CreateLogUseCase
    private readonly animeEpisodeVideoOptionConvert: AnimeEpisodeVideoOptionConverter

    constructor({ animeEpisodeVideoOptionConvert, createLog, prismaClient }: AnimeEpisodeVideoOptionPostgresDatasourceProps){
        this.prismaClient = prismaClient
        this.createLog = createLog
        this.animeEpisodeVideoOptionConvert = animeEpisodeVideoOptionConvert 
            ? animeEpisodeVideoOptionConvert 
            : new AnimeEpisodeVideoOptionConverterPostgres()
    }

    async find(filters?: Criteria<any>): Promise<AnimeEpisodeVideoOption[]> {
        try {
            const postgresObjects = await this.prismaClient.animeEpisodeVideoOption.findMany({
                where:{ ...filters?.applyFilter() }
            })
            return postgresObjects.map((postgresObject) => this.animeEpisodeVideoOptionConvert.convert(postgresObject))
        } catch (error) {
            this.errorHandlerFind(error)
            throw error
        }
    }
    
    private errorHandlerFind(error:unknown){
        this.createLog.execute(new CreateLogDto({
            message: `${error}`,
            level: LogSeverityLevel.HIGH,
            origin: `anime-episode-video-option-postgres.datasource.ts - find`,
        }))
    }
    async create(createAnimeEpisodeVideoOptionDto: CreateAnimeEpisodeVideoOptionDto): Promise<AnimeEpisodeVideoOption> {
        try {
            const { episodeId: animeEpisodeId, ...rest } = createAnimeEpisodeVideoOptionDto
            const postgresObject = await this.prismaClient.animeEpisodeVideoOption.create({
                data:{ animeEpisodeId, ...rest }
            })
            return this.animeEpisodeVideoOptionConvert.convert(postgresObject)
        } catch (error) {
            this.errorHandlerCreate(error)
            throw error
        }
    }

    private errorHandlerCreate(error:unknown){
        this.createLog.execute(new CreateLogDto({
            message: `${error}`,
            level: LogSeverityLevel.LOW,
            origin: `anime-episode-video-option-postgres.datasource.ts - create`,
        }))
    }
}