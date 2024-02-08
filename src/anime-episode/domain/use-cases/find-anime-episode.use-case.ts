import { Criteria } from "../base";
import { AnimeEpisode } from "../entity";

export abstract class FindAnimeEpisodeUseCase{
    public abstract execute(filters?: Criteria<any>): Promise<AnimeEpisode[]>
}