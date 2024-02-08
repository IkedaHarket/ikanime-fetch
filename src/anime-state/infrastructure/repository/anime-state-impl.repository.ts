import { Criteria } from "../../domain/base";
import { AnimeStateDatasource } from "../../domain/datasource";
import { CreateAnimeStateDto } from "../../domain/dto";
import { AnimeState } from "../../domain/entity";
import { AnimeStateRepository } from "../../domain/repository";

export class AnimeStateRepositoryImpl implements AnimeStateRepository{

    constructor(
        private readonly animeStateDatasource: AnimeStateDatasource
    ){}

    find(filters?: Criteria<any> | undefined): Promise<AnimeState[]> {
        return this.animeStateDatasource.find(filters)
    }

    create(createAnimeStateDto: CreateAnimeStateDto): Promise<AnimeState> {
        return this.animeStateDatasource.create(createAnimeStateDto)
    }

}