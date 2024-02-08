import { Criteria } from "../base";
import { AnimeType } from "../entity";

export abstract class FindAnimeTypeUseCase{
    public abstract execute(filters?: Criteria<any>): Promise<AnimeType[]>
}