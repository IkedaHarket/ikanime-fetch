import { Criteria } from "../../domain/base";
import { AnimeCategoryDatasource } from "../../domain/datasource";
import { CreateAnimeCategoryDto } from "../../domain/dto";
import { AnimeCategory } from "../../domain/entity";
import { AnimeCategoryRepository } from "../../domain/repository";


export class AnimeCategoryRepositoryImpl implements AnimeCategoryRepository{

    constructor(
        private readonly animeCategoryDatasource: AnimeCategoryDatasource
    ){}

    find(filters?: Criteria<any> | undefined): Promise<AnimeCategory[]> {
        return this.animeCategoryDatasource.find(filters)
    }

    create(createAnimeCateryDto: CreateAnimeCategoryDto): Promise<AnimeCategory> {
        return this.animeCategoryDatasource.create(createAnimeCateryDto)
    }

}