
import { Criteria } from "../base";
import { CreateAnimeEpisodeDto } from "../dto";
import { AnimeEpisode } from "../entity";

export abstract class AnimeEpisodeDatasource {
    abstract create( createAnimeEpisodeDto: CreateAnimeEpisodeDto ): Promise<AnimeEpisode>
    abstract find( filters?: Criteria<any> ): Promise<AnimeEpisode[]>
}