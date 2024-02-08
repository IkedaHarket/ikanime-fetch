import { LogDatasource } from "../../domain/datasource"
import { CreateLogDto } from "../../domain/dto"
import { Log } from "../../domain/entity"
import { LogSeverityLevel } from "../../domain/enums"
import { LogRepository } from "../../domain/repository"


export class LogRepositoryImpl implements LogRepository{

    constructor(
        private readonly logDatasource: LogDatasource
    ){}

    create(createLogDto: CreateLogDto): Promise<Log> {
        return this.logDatasource.create(createLogDto)
    }
    
    getBySeveritylevel(severityLevel: LogSeverityLevel): Promise<Log[]> {
        return this.logDatasource.getBySeveritylevel(severityLevel)
    }

}