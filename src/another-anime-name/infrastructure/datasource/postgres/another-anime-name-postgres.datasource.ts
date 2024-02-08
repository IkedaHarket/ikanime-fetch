import { PrismaClient } from "@prisma/client";
import { CreateLogDto, CreateLogUseCase, LogSeverityLevel } from "../../../../log";
import { Criteria } from "../../../domain/base";
import { AnotherAnimeName } from "../../../domain/entity";
import { CreateAnotherAnimeNameDto } from "../../../domain/dto";
import { AnotherAnimeNameDatasource } from "../../../domain/datasource";
import { AnotherAnimeNameConverter, AnotherAnimeNameConverterPostgres } from "./adapters";

interface AnotherAnimeNamePostgresDatasourceProps {
    prismaClient: PrismaClient
    createLog: CreateLogUseCase
    anotherAnimeNameConvert?: AnotherAnimeNameConverter
}

export class AnotherAnimeNamePostgresDatasource implements AnotherAnimeNameDatasource{

    private readonly prismaClient: PrismaClient
    private readonly createLog: CreateLogUseCase
    private readonly anotherAnimeNameConvert: AnotherAnimeNameConverter

    constructor({ anotherAnimeNameConvert, createLog, prismaClient }: AnotherAnimeNamePostgresDatasourceProps){
        this.prismaClient = prismaClient
        this.createLog = createLog
        this.anotherAnimeNameConvert = anotherAnimeNameConvert ? anotherAnimeNameConvert : new AnotherAnimeNameConverterPostgres()
    }

    async find(filters?: Criteria<any>): Promise<AnotherAnimeName[]> {
        try {
            const postgresObjects = await this.prismaClient.anotherAnimeName.findMany({
                where:{ ...filters?.applyFilter() }
            })
            return postgresObjects.map((postgresObject) => this.anotherAnimeNameConvert.convert(postgresObject))
        } catch (error) {
            this.errorHandlerFind(error)
            throw error
        }
    }

    private errorHandlerFind(error: unknown){
        this.createLog.execute(new CreateLogDto({
            message: `${error}`,
            level: LogSeverityLevel.LOW,
            origin: `another-anime-name-postgres.datasource.ts - find`,
        }))
        throw new Error(`${error}`)
    }

    async create(createAnotherAnimeNameDto: CreateAnotherAnimeNameDto): Promise<AnotherAnimeName> {
        try {
            const postgresObject = await this.prismaClient.anotherAnimeName.create({
                data: { ...createAnotherAnimeNameDto }
            })
            return this.anotherAnimeNameConvert.convert(postgresObject)
        } catch (error) {
            this.errorHandlerCreate(error)
            throw error
        }
    }

    private errorHandlerCreate(error: unknown){
        this.createLog.execute(new CreateLogDto({
            message: `${error}`,
            level: LogSeverityLevel.LOW,
            origin: `another-anime-name-postgres.datasource.ts - create`,
        }))
        throw error
    }
}