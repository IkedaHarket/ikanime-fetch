import { Criteria } from "../../domain/base";
import { AnimeTypeDatasource } from "../../domain/datasource";
import { CreateAnimeTypeDto } from "../../domain/dto";
import { AnimeType } from "../../domain/entity";
import { AnimeTypeRepository } from "../../domain/repository";


export class AnimeTypeRepositoryImpl implements AnimeTypeRepository{

    constructor(
        private readonly animeTypeDatasource: AnimeTypeDatasource
    ){}

    find(filters?: Criteria<any> | undefined): Promise<AnimeType[]> {
        return this.animeTypeDatasource.find(filters)
    }

    create(createAnimeTypeDto: CreateAnimeTypeDto): Promise<AnimeType> {
        return this.animeTypeDatasource.create(createAnimeTypeDto)
    }

}