import { AnimeEpisode, CreateAnimeEpisodeDto } from "../../../anime-episode";

export abstract class IAnimeEpisodeService{ 
    abstract createEpisodeIfNotExist(createAnimeEpisodeDto: CreateAnimeEpisodeDto): Promise<AnimeEpisode>
}