

import { AnotherAnimeName, CompositeFilterAnotherAnimeNamePostgres, CreateAnotherAnimeNameDto, CreateAnotherAnimeNameUseCase, CriteriaEqualNameAnotherAnimeNamePostgres, FindAnotherAnimeNameUseCase } from "../../another-anime-name";
import { CriteriaEqualAnimeIdAnotherAnimeNamePostgres } from "../../another-anime-name/infrastructure/datasource/postgres/filters/equal-anime-id-another-anime-name-postgres.criteria";
import { CreateLogUseCase } from "../../log";
import { IAnotherAnimeNameService } from "../domain/services";

interface AnotherAnimeNameServiceProps{
    createLog: CreateLogUseCase
    createAnotherAnimeName: CreateAnotherAnimeNameUseCase
    findAnotherAnimeName: FindAnotherAnimeNameUseCase
}

export class  AnotherAnimeNameService implements IAnotherAnimeNameService {

    private readonly createAnotherAnimeName: CreateAnotherAnimeNameUseCase
    private readonly findAnotherAnimeName: FindAnotherAnimeNameUseCase
    private readonly createLog: CreateLogUseCase

    constructor({ createLog, createAnotherAnimeName, findAnotherAnimeName }:AnotherAnimeNameServiceProps){
        this.createAnotherAnimeName = createAnotherAnimeName
        this.findAnotherAnimeName = findAnotherAnimeName
        this.createLog = createLog
    }

    async createAnotherAnimeNameIfNotExist( createAnotherAnimeNameDto: CreateAnotherAnimeNameDto ): Promise<AnotherAnimeName>{
        try {
            const filterEqualAnimeId = new CriteriaEqualAnimeIdAnotherAnimeNamePostgres(createAnotherAnimeNameDto.animeId)
            const filterEqualName = new CriteriaEqualNameAnotherAnimeNamePostgres(createAnotherAnimeNameDto.name)
            const filter = new CompositeFilterAnotherAnimeNamePostgres({
                criteria:[filterEqualAnimeId, filterEqualName],
                logic: 'AND'
            })
            const anotherAnimeNames = await this.findAnotherAnimeName.execute(filter)
            
            if(anotherAnimeNames.length > 0){
                return anotherAnimeNames.at(0)!
            }
            
            const newAnotherAnimeName = await this.createAnotherAnimeName.execute(createAnotherAnimeNameDto)
            return newAnotherAnimeName
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}