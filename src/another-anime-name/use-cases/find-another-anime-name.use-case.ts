import { Criteria } from "../domain/base"
import { AnotherAnimeName } from "../domain/entity"
import { AnotherAnimeNameRepository } from "../domain/repository"
import { FindAnotherAnimeNameUseCase } from "../domain/use-cases"

export class FindAnotherAnimeName implements FindAnotherAnimeNameUseCase{
    
    constructor(
        private readonly anotherAnimeNameRepository: AnotherAnimeNameRepository,
    ){}

    public execute(filters?: Criteria<any>): Promise<AnotherAnimeName[]> {
        try {
            return this.anotherAnimeNameRepository.find(filters)
        } catch (error) {
            throw error
        }
    }

}