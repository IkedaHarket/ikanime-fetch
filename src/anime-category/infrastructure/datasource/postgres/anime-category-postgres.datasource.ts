import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { CreateLogDto, CreateLogUseCase, LogSeverityLevel } from "../../../../log";
import { Criteria } from "../../../domain/base";
import { AnimeCategoryConverter, AnimeCategoryConverterPostgres } from "./adapters";
import { AnimeCategoryDatasource } from "../../../domain/datasource";
import { AnimeCategory } from "../../../domain/entity";
import { CreateAnimeCategoryDto } from "../../../domain/dto";

interface AnimeCategoryPostgresDatasourceProps{
    prismaClient: PrismaClient
    createLog: CreateLogUseCase
    animeCategoryConvert?: AnimeCategoryConverter
}

export class AnimeCategoryPostgresDatasource implements AnimeCategoryDatasource{

    private readonly prismaClient: PrismaClient
    private readonly createLog: CreateLogUseCase
    private readonly animeCategoryConvert: AnimeCategoryConverter

    constructor({ animeCategoryConvert, createLog, prismaClient }: AnimeCategoryPostgresDatasourceProps){
        this.prismaClient = prismaClient
        this.createLog = createLog
        this.animeCategoryConvert = animeCategoryConvert ? animeCategoryConvert : new AnimeCategoryConverterPostgres()
    }

    async find(filters?: Criteria<any>): Promise<AnimeCategory[]> {
        try {
            const postgresObjects = await this.prismaClient.animeCategory.findMany({
                where:{ ...filters?.applyFilter() }
            })
            return postgresObjects.map((postgresObject) => this.animeCategoryConvert.convert(postgresObject))
        } catch (error) {
            this.errorHandlerFind(error)
            throw error
        }
    }

    private errorHandlerFind(error: unknown){
        this.createLog.execute(new CreateLogDto({
            message: `${error}`,
            level: LogSeverityLevel.HIGH,
            origin: `anime-category-postgres.datasource.ts - find`,
        }))
        throw new Error(`${error}`)
    }

    async create(createAnimeCategoryDto: CreateAnimeCategoryDto): Promise<AnimeCategory> {
        try {
            const postgresObject = await this.prismaClient.animeCategory.create({
                data:{ ...createAnimeCategoryDto }
            })
            return this.animeCategoryConvert.convert(postgresObject)
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
                    origin: `anime-category-postgres.datasource.ts - create`,
                }))
                throw 'Column name already exists'
            }
        }
    }
}