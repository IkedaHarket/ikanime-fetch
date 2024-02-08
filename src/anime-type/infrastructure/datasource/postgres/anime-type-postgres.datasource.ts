import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AnimeTypeDatasource } from "../../../domain/datasource";
import { CreateAnimeTypeDto } from "../../../domain/dto";
import { AnimeType } from "../../../domain/entity";
import { CreateLogDto, CreateLogUseCase, LogSeverityLevel } from "../../../../log";
import { Criteria } from "../../../domain/base";
import { AnimeTypeConverter, AnimeTypeConverterPostgres } from "./adapters";

interface AnimeTypePostgresDatasourceProps{
    prismaClient: PrismaClient
    createLog: CreateLogUseCase
    animeTypeConvert?: AnimeTypeConverter
}

export class AnimeTypePostgresDatasource implements AnimeTypeDatasource{

    private readonly prismaClient: PrismaClient
    private readonly createLog: CreateLogUseCase
    private readonly animeTypeConvert: AnimeTypeConverter

    constructor({ animeTypeConvert, createLog, prismaClient }: AnimeTypePostgresDatasourceProps){
        this.prismaClient = prismaClient
        this.createLog = createLog
        this.animeTypeConvert = animeTypeConvert ? animeTypeConvert : new AnimeTypeConverterPostgres()
    }

    async find(filters?: Criteria<any>): Promise<AnimeType[]> {
        try {
            const postgresObjects = await this.prismaClient.animeType.findMany({
                where:{ ...filters?.applyFilter() }
            })
            return postgresObjects.map((postgresObject) => this.animeTypeConvert.convert(postgresObject))
        } catch (error) {
            this.errorHandlerFind(error)
            throw error
        }
    }

    private errorHandlerFind(error: unknown){
        if(error instanceof PrismaClientKnownRequestError){
            this.createLog.execute(new CreateLogDto({
                message: `${error}`,
                level: LogSeverityLevel.HIGH,
                origin: `anime-type-postgres.datasource.ts - find`,
            }))
            throw new Error(`${error}`)
        }
    }

    async create(createAnimeTypeDto: CreateAnimeTypeDto): Promise<AnimeType> {
        try {
            const { name, isActive } = createAnimeTypeDto
            const postgresObject = await this.prismaClient.animeType.create({
                data:{ name, isActive }
            })
            return this.animeTypeConvert.convert(postgresObject)
        } catch (error) {
            this.errorHandlerCreate(error)
            throw error
        }
    }

    private errorHandlerCreate(error: unknown){
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code === 'P2002'){
                this.createLog.execute(new CreateLogDto({
                    message: `Column name already exists`,
                    level: LogSeverityLevel.LOW,
                    origin: `anime-type-postgres.datasource.ts - create`,
                }))
                throw 'Column name already exists'
            }
        }
    }
}