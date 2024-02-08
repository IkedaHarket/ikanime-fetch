import { CreateAnimeEpisodeVideoOptionDto } from "../dto";
import { AnimeEpisodeVideoOption } from "../entity";

export abstract class CreateAnimeEpisodeVideoOptionUseCase {
  public abstract execute(
    createAnimeEpisodeVideoOptionDto: CreateAnimeEpisodeVideoOptionDto
  ): Promise<AnimeEpisodeVideoOption>;
}
