import { CreateLogDto } from "../domain/dto";
import { Log } from "../domain/entity";
import { LogRepository } from "../domain/repository";
import { CreateLogUseCase } from "../domain/use-cases";

export class CreateLog implements CreateLogUseCase{
    
    constructor(
        private readonly logRepository: LogRepository
    ){}

    execute(createLogDto: CreateLogDto): Promise<Log> {
        return this.logRepository.create(createLogDto)
    }

}