import { PrismaClient, LogSeverityLevel as  LogSeverityLevelPrisma } from "@prisma/client"
import { LogDatasource } from "../../domain/datasource"
import { LogConverter, LogConverterPostgres } from "../adapters"
import { CreateLogDto } from "../../domain/dto"
import { Log } from "../../domain/entity"
import { LogSeverityLevel } from "../../domain/enums"

const SeverityEnum = {
    LOW: LogSeverityLevelPrisma.LOW,
    MEDIUM: LogSeverityLevelPrisma.MEDIUM,
    HIGH: LogSeverityLevelPrisma.HIGH,
}

export class LogPostgresDatasource implements LogDatasource{

    constructor(
        private readonly prismaClient: PrismaClient,
        private readonly logConvert: LogConverter = new LogConverterPostgres()
    ){}
    
    async create(createLogDto: CreateLogDto): Promise<Log> {
        const { level, ...logData} = createLogDto
        const severity = SeverityEnum[level]
        const postgresObject = await this.prismaClient.log.create({
            data: { ...logData, severity }
        })
        return this.logConvert.convert(postgresObject)
    }
    
    getBySeveritylevel(severityLevel: LogSeverityLevel): Promise<Log[]> {
        throw new Error("Method not implemented.")
    }

}