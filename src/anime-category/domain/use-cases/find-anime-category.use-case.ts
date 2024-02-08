import { Criteria } from "../base";
import { AnimeCategory } from "../entity";

export abstract class FindAnimeCategoryUseCase{
    public abstract execute(filters?: Criteria<any>): Promise<AnimeCategory[]>
}