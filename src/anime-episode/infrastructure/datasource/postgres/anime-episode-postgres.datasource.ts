import { PrismaClient } from "@prisma/client";
import { CreateLogDto, CreateLogUseCase, LogSeverityLevel } from "../../../../log";
import { Criteria } from "../../../domain/base";
import { AnimeEpisodeConverter, AnimeEpisodeConverterPostgres } from "./adapters";
import { AnimeEpisodeDatasource } from "../../../domain/datasource";
import { AnimeEpisode } from "../../../domain/entity";
import { CreateAnimeEpisodeDto } from "../../../domain/dto";

interface AnimeEpisodePostgresDatasourceProps{
    prismaClient: PrismaClient
    createLog: CreateLogUseCase
    animeEpisodeConvert?: AnimeEpisodeConverter
}

export class AnimeEpisodePostgresDatasource implements AnimeEpisodeDatasource{

    private readonly prismaClient: PrismaClient
    private readonly createLog: CreateLogUseCase
    private readonly animeEpisodeConvert: AnimeEpisodeConverter

    constructor({ animeEpisodeConvert, createLog, prismaClient }: AnimeEpisodePostgresDatasourceProps){
        this.prismaClient = prismaClient
        this.createLog = createLog
        this.animeEpisodeConvert = animeEpisodeConvert ? animeEpisodeConvert : new AnimeEpisodeConverterPostgres()
    }

    async find(filters?: Criteria<any>): Promise<AnimeEpisode[]> {
        try {
            const postgresObjects = await this.prismaClient.animeEpisode.findMany({
                where:{ ...filters?.applyFilter() }
            })
            return postgresObjects.map((postgresObject) => this.animeEpisodeConvert.convert(postgresObject))
        } catch (error) {
            this.errorHandlerFind(error)
            throw error
        }
    }

    private errorHandlerFind(error: unknown){
        this.createLog.execute(new CreateLogDto({
            message: `${error}`,
            level: LogSeverityLevel.HIGH,
            origin: `anime-episode-postgres.datasource.ts - find`,
        }))
        throw new Error(`${error}`)
    }

    async create(createAnimeEpisodeDto: CreateAnimeEpisodeDto): Promise<AnimeEpisode> {
        try {
            const postgresObject = await this.prismaClient.animeEpisode.create({
                data:{ ...createAnimeEpisodeDto }
            })
            return this.animeEpisodeConvert.convert(postgresObject)
        } catch (error) {
            this.errorHandlerCreate(error)
            throw error
        }
    }

    private errorHandlerCreate(error: unknown){
        this.createLog.execute(new CreateLogDto({
            message: `${error}`,
            level: LogSeverityLevel.HIGH,
            origin: `anime-episode-postgres.datasource.ts - create`,
        }))
        throw error
    }
}