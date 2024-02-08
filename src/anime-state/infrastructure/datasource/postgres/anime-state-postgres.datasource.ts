import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { CreateLogDto, CreateLogUseCase, LogSeverityLevel } from "../../../../log";
import { Criteria } from "../../../domain/base";
import { AnimeStateConverter, AnimeStateConverterPostgres } from "../";
import { AnimeStateDatasource } from "../../../domain/datasource";
import { AnimeState } from "../../../domain/entity";
import { CreateAnimeStateDto } from "../../../domain/dto";

interface AnimeStatePostgresDatasourceProps{
    prismaClient: PrismaClient
    createLog: CreateLogUseCase
    animeStateConvert?: AnimeStateConverter
}

export class AnimeStatePostgresDatasource implements AnimeStateDatasource{

    private readonly prismaClient: PrismaClient
    private readonly createLog: CreateLogUseCase
    private readonly animeStateConvert: AnimeStateConverter

    constructor({ animeStateConvert, createLog, prismaClient }: AnimeStatePostgresDatasourceProps){
        this.prismaClient = prismaClient
        this.createLog = createLog
        this.animeStateConvert = animeStateConvert ? animeStateConvert : new AnimeStateConverterPostgres()
    }

    async find(filters?: Criteria<any>): Promise<AnimeState[]> {
        try {
            const postgresObjects = await this.prismaClient.animeState.findMany({
                where:{ ...filters?.applyFilter() }
            })
            return postgresObjects.map((postgresObject) => this.animeStateConvert.convert(postgresObject))
        } catch (error) {
            this.errorHandlerFind(error)
            throw error
        }
    }
    
    private errorHandlerFind(error:unknown){
        if(error instanceof PrismaClientKnownRequestError){
            this.createLog.execute(new CreateLogDto({
                message: `${error}`,
                level: LogSeverityLevel.LOW,
                origin: `anime-state-postgres.datasource.ts - find`,
            }))
            throw new Error(`${error}`)
        }
    }
    async create(createAnimeStateDto: CreateAnimeStateDto): Promise<AnimeState> {
        try {
            const { name, isActive } = createAnimeStateDto
            const postgresObject = await this.prismaClient.animeState.create({
                data:{ name, isActive }
            })
            return this.animeStateConvert.convert(postgresObject)
        } catch (error) {
            this.errorHandlerCreate(error)
            throw error
        }
    }

    private errorHandlerCreate(error:unknown){
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code === 'P2002'){
                this.createLog.execute(new CreateLogDto({
                    message: `Column name already exists`,
                    level: LogSeverityLevel.LOW,
                    origin: `anime-state-postgres.datasource.ts - create`,
                }))
                throw new Error('Column name already exists')
            }
        }
    }
}