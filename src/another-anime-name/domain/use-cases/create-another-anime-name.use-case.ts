import { CreateAnotherAnimeNameDto } from "../dto";
import { AnotherAnimeName } from "../entity";


export abstract class CreateAnotherAnimeNameUseCase{
    public abstract execute(createAnotherAnimeNameDto: CreateAnotherAnimeNameDto): Promise<AnotherAnimeName>
}