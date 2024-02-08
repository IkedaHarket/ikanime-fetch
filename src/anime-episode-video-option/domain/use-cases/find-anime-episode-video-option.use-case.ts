import { Criteria } from "../base";
import { AnimeEpisodeVideoOption } from "../entity";

export abstract class FindAnimeEpisodeVideoOptionUseCase{
    public abstract execute(filters?: Criteria<any>): Promise<AnimeEpisodeVideoOption[]>
}