import { Criteria } from "../base";
import { CreateAnimeEpisodeVideoOptionDto } from "../dto";
import { AnimeEpisodeVideoOption } from "../entity";

export abstract class AnimeEpisodeVideoOptionDatasource {
    abstract create( createAnimeEpisodeVideoOptionDto: CreateAnimeEpisodeVideoOptionDto ): Promise<AnimeEpisodeVideoOption>
    abstract find( filters?: Criteria<any> ): Promise<AnimeEpisodeVideoOption[]>
}