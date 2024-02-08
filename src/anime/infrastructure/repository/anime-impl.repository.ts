import { Criteria } from "../../domain/base";
import { AnimeDatasource } from "../../domain/datasource";
import { CreateAnimeDto } from "../../domain/dto";
import { Anime } from "../../domain/entity";
import { AnimeRepository } from "../../domain/repository";

export class AnimeRepositoryImpl implements AnimeRepository{

    constructor(
        private readonly animeDatasource: AnimeDatasource
    ){}

    find(filters?: Criteria<any> | undefined): Promise<Anime[]> {
        return this.animeDatasource.find(filters)
    }

    create(createAnimeDto: CreateAnimeDto): Promise<Anime> {
        return this.animeDatasource.create(createAnimeDto)
    }

}