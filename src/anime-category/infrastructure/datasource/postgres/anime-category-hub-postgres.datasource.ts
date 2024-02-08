import { PrismaClient } from "@prisma/client";
import { AnimeCategoryHubConverter, AnimeCategoryHubConverterPostgres } from "./adapters";
import { CreateLogDto, CreateLogUseCase, LogSeverityLevel } from "../../../../log";
import { AnimeCategoryHubDatasource } from "../../../domain/datasource";
import { Criteria } from "../../../domain/base";
import { AnimeCategoryHub } from "../../../domain/entity";
import { CreateAnimeCategoryHubDto } from "../../../domain/dto/create-anime-category-hub.dto";


interface AnimeCategoryHubPostgresDatasourceProps{
    prismaClient: PrismaClient
    createLog: CreateLogUseCase
    animeCategoryHubConvert?: AnimeCategoryHubConverter
}

export class AnimeCategoryHubPostgresDatasource implements AnimeCategoryHubDatasource{

    private readonly prismaClient: PrismaClient
    private readonly createLog: CreateLogUseCase
    private readonly animeCategoryHubConvert: AnimeCategoryHubConverter

    constructor({ animeCategoryHubConvert, createLog, prismaClient }: AnimeCategoryHubPostgresDatasourceProps){
        this.prismaClient = prismaClient
        this.createLog = createLog
        this.animeCategoryHubConvert = animeCategoryHubConvert ? animeCategoryHubConvert : new AnimeCategoryHubConverterPostgres()
    }

    async find(filters?: Criteria<any>): Promise<AnimeCategoryHub[]> {
        try {
            const postgresObjects = await this.prismaClient.animeCategoryHub.findMany({
                where:{ ...filters?.applyFilter() }
            })
            return postgresObjects.map((postgresObject) => this.animeCategoryHubConvert.convert(postgresObject))
        } catch (error) {
            this.errorHandlerFind(error)
            throw error
        }
    }

    private errorHandlerFind(error: unknown){
        this.createLog.execute(new CreateLogDto({
            message: `${error}`,
            level: LogSeverityLevel.HIGH,
            origin: `anime-category-hub-postgres.datasource.ts - find`,
        }))
        throw new Error(`${error}`)
    }

    async create(createAnimeCategoryHubDto: CreateAnimeCategoryHubDto): Promise<AnimeCategoryHub> {
        try {
            const postgresObject = await this.prismaClient.animeCategoryHub.create({
                data:{ 
                    animeId: createAnimeCategoryHubDto.animeId,
                    animeCategoryId: createAnimeCategoryHubDto.categoryId,
                 }
            })
            return this.animeCategoryHubConvert.convert(postgresObject)
        } catch (error) {
            this.errorHandlerCreate(error)
            throw error
        }
    }

    private errorHandlerCreate(error: unknown){
        this.createLog.execute(new CreateLogDto({
            message: `${error}`,
            level: LogSeverityLevel.LOW,
            origin: `anime-category-hub-postgres.datasource.ts - create`,
        }))
    }
}