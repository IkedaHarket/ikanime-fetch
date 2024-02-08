import { Criteria } from "../base";
import { AnimeCategoryHub } from "../entity";

export abstract class FindAnimeCategoryHubUseCase{
    public abstract execute(filters?: Criteria<any>): Promise<AnimeCategoryHub[]>
}