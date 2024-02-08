import { Criteria } from "../base";
import { Anime } from "../entity";

export abstract class FindAnimeUseCase{
    public abstract execute(filters?: Criteria<any>): Promise<Anime[]>
}