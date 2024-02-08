import { Criteria } from "../base";
import { CreateAnotherAnimeNameDto } from "../dto";
import { AnotherAnimeName } from "../entity";

export abstract class AnotherAnimeNameRepository {
    abstract create( createAnotherAnimeNameDto: CreateAnotherAnimeNameDto ): Promise<AnotherAnimeName>
    abstract find( filters?: Criteria<any> ): Promise<AnotherAnimeName[]>
}