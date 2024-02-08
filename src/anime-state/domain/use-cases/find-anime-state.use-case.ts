import { Criteria } from "../base";
import { AnimeState } from "../entity";

export abstract class FindAnimeStateUseCase{
    public abstract execute(filters?: Criteria<any>): Promise<AnimeState[]>
}