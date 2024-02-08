import { CreateLogDto } from "../dto";
import { Log } from "../entity";
import { LogSeverityLevel } from "../enums";

export abstract class LogDatasource{
    abstract create( log: CreateLogDto): Promise<Log>
    abstract getBySeveritylevel(severityLevel: LogSeverityLevel): Promise<Log[]>
}