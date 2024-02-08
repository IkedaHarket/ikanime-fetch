import { CreateLogDto } from "../dto";
import { Log } from "../entity";

export abstract class CreateLogUseCase{
    abstract execute(createLogDto: CreateLogDto): Promise<Log>
}