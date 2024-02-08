import { Criteria } from "../../domain/base";
import { AnimeEpisodeDatasource } from "../../domain/datasource";
import { CreateAnimeEpisodeDto } from "../../domain/dto";
import { AnimeEpisode } from "../../domain/entity";
import { AnimeEpisodeRepository } from "../../domain/repository";

export class AnimeEpisodeRepositoryImpl implements AnimeEpisodeRepository{

    constructor(
        private readonly animeEpisodeDatasource: AnimeEpisodeDatasource
    ){}

    find(filters?: Criteria<any> | undefined): Promise<AnimeEpisode[]> {
        return this.animeEpisodeDatasource.find(filters)
    }

    create(createAnimeEpisodeDto: CreateAnimeEpisodeDto): Promise<AnimeEpisode> {
        return this.animeEpisodeDatasource.create(createAnimeEpisodeDto)
    }

}