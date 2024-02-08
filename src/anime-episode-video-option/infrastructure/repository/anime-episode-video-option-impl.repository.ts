import { Criteria } from "../../domain/base";
import { AnimeEpisodeVideoOptionDatasource } from "../../domain/datasource";
import { CreateAnimeEpisodeVideoOptionDto } from "../../domain/dto";
import { AnimeEpisodeVideoOption } from "../../domain/entity";
import { AnimeEpisodeVideoOptionRepository } from "../../domain/repository";

export class AnimeEpisodeVideoOptionRepositoryImpl implements AnimeEpisodeVideoOptionRepository{

    constructor(
        private readonly animeEpisodeVideoOptionDatasource: AnimeEpisodeVideoOptionDatasource
    ){}

    find(filters?: Criteria<any> | undefined): Promise<AnimeEpisodeVideoOption[]> {
        return this.animeEpisodeVideoOptionDatasource.find(filters)
    }

    create(createAnimeEpisodeVideoOptionDto: CreateAnimeEpisodeVideoOptionDto): Promise<AnimeEpisodeVideoOption> {
        return this.animeEpisodeVideoOptionDatasource.create(createAnimeEpisodeVideoOptionDto)
    }

}