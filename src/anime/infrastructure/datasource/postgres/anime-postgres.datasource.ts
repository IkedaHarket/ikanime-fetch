import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { CreateLogDto, CreateLogUseCase, LogSeverityLevel } from "../../../../log";
import { Criteria } from "../../../domain/base";
import { AnimeDatasource } from "../../../domain/datasource";
import { Anime } from "../../../domain/entity";
import { AnimeConverter, AnimeConverterPostgres } from "./adapters/anime-converter.inf-adapter";
import { CreateAnimeDto } from "../../../domain/dto";

interface AnimeTypePostgresDatasourceProps{
    prismaClient: PrismaClient
    createLog: CreateLogUseCase
    animeConvert?: AnimeConverter
}

export class AnimePostgresDatasource implements AnimeDatasource{

    private readonly prismaClient: PrismaClient
    private readonly createLog: CreateLogUseCase
    private readonly animeConvert: AnimeConverter

    constructor({ animeConvert, createLog, prismaClient }: AnimeTypePostgresDatasourceProps){
        this.prismaClient = prismaClient
        this.createLog = createLog
        this.animeConvert = animeConvert ? animeConvert : new AnimeConverterPostgres()
    }

    async find(filters?: Criteria<any>): Promise<Anime[]> {
        try {
            const postgresObjects = await this.prismaClient.anime.findMany({
                where:{ ...filters?.applyFilter() }
            })
            return postgresObjects.map((postgresObject) => this.animeConvert.convert(postgresObject))
        } catch (error) {
            this.errorHandlerFind(error)
            throw error
        }
    }
    
    private errorHandlerFind(error:unknown){
        this.createLog.execute(new CreateLogDto({
            message: `${error}`,
            level: LogSeverityLevel.HIGH,
            origin: `anime-postgres.datasource.ts - find`,
        }))
        throw new Error(`${error}`)
    }

    async create(createAnimeDto: CreateAnimeDto): Promise<Anime> {
        try {
            const postgresObject = await this.prismaClient.anime.create({
                data:{ ...createAnimeDto }
            })
            return this.animeConvert.convert(postgresObject)
        } catch (error) {
            this.errorHandlerCreate(error)
            throw error
        }
    }

    private errorHandlerCreate(error:unknown){
        this.createLog.execute(new CreateLogDto({
            message: `${error}`,
            level: LogSeverityLevel.HIGH,
            origin: `anime-postgres.datasource.ts - create`,
        }))
        throw error
            
    }
}