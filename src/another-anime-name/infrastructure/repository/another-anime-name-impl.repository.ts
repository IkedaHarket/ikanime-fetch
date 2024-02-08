import { Criteria } from "../../domain/base";
import { AnotherAnimeNameDatasource } from "../../domain/datasource";
import { CreateAnotherAnimeNameDto } from "../../domain/dto";
import { AnotherAnimeName } from "../../domain/entity";
import { AnotherAnimeNameRepository } from "../../domain/repository";


export class AnotherAnimeNameRepositoryImpl implements AnotherAnimeNameRepository{

    constructor(
        private readonly anotherAnimeName: AnotherAnimeNameDatasource
    ){}

    find(filters?: Criteria<any> | undefined): Promise<AnotherAnimeName[]> {
        return this.anotherAnimeName.find(filters)
    }

    create(createAnotherAnimeName: CreateAnotherAnimeNameDto): Promise<AnotherAnimeName> {
        return this.anotherAnimeName.create(createAnotherAnimeName)
    }

}