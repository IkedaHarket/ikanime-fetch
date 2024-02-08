import { AnimeEpisodeVideoOption, CreateAnimeEpisodeVideoOptionDto } from "../../../anime-episode-video-option";

export abstract class IAnimeEpisodeVideoOptionService {
  abstract createVideoOptionIfNotExist(
    createAnimeEpisodeVideoOptionDto: CreateAnimeEpisodeVideoOptionDto
  ): Promise<AnimeEpisodeVideoOption>;
}