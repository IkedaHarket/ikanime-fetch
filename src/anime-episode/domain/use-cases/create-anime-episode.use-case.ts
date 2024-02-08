import { CreateAnimeEpisodeDto } from "../dto";
import { AnimeEpisode } from "../entity";

export abstract class CreateAnimeEpisodeUseCase{
    public abstract execute( createAnimeEpisodeDto: CreateAnimeEpisodeDto ): Promise<AnimeEpisode>
}