import { LogSeverityLevel as LogSeverityLevelPrisma } from "@prisma/client";
import { Log } from "../../domain/entity";
import { LogSeverityLevel } from "../../domain/enums";

export abstract class LogConverter{
    abstract convert(postgresObject: PostgresObject): Log
}

interface PostgresObject{
    id: string;
    origin: string;
    message: string;
    severity: LogSeverityLevelPrisma;
    createdAt: Date;
}

export class LogConverterPostgres implements LogConverter{

    private postgresObject !: PostgresObject

    public convert(postgresObject: PostgresObject): Log{
        this.postgresObject = postgresObject
        this.verifyPostgresObject()
        
         const { 
            createdAt,
            id,
            message,
            origin,
            severity
          } = this.postgresObject
          

          return new Log({createdAt, id, message, origin, level: severity as LogSeverityLevel})
    }
 
    private verifyPostgresObject(): true{
         if(!this.postgresObject) throw new Error('Not valid postgres response')
         if(Object.keys(this.postgresObject).length === 0) throw new Error('Object is empty')
         if(this.isNotValidSeveritylevel(this.postgresObject.severity)) throw new Error('Severity is not valid')
         return true
    }

    private isValidSeverityLevel(severity:string): severity is LogSeverityLevel {
        return Object.values(LogSeverityLevel).includes(severity as LogSeverityLevel)
    }

    private isNotValidSeveritylevel(severity:string): severity is LogSeverityLevel{
        return !this.isValidSeverityLevel(severity)
    }
}