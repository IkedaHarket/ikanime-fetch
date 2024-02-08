import { Criteria } from "../base";
import { AnotherAnimeName } from "../entity";

export abstract class FindAnotherAnimeNameUseCase{
    public abstract execute(filters?: Criteria<any>): Promise<AnotherAnimeName[]>
}