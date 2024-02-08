import { Criteria } from "../../domain/base";
import { AnimeCategoryHubDatasource } from "../../domain/datasource";
import { CreateAnimeCategoryHubDto } from "../../domain/dto/create-anime-category-hub.dto";
import { AnimeCategoryHub } from "../../domain/entity";
import { AnimeCategoryHubRepository } from "../../domain/repository";


export class AnimeCategoryHubRepositoryImpl implements AnimeCategoryHubRepository{

    constructor(
        private readonly animeCategoryHubDatasource: AnimeCategoryHubDatasource
    ){}

    find(filters?: Criteria<any> | undefined): Promise<AnimeCategoryHub[]> {
        return this.animeCategoryHubDatasource.find(filters)
    }

    create(createAnimeCateryHubDto: CreateAnimeCategoryHubDto): Promise<AnimeCategoryHub> {
        return this.animeCategoryHubDatasource.create(createAnimeCateryHubDto)
    }

}