
import { CreateAnotherAnimeNameDto } from "../domain/dto"
import { AnotherAnimeName } from "../domain/entity"
import { AnotherAnimeNameRepository } from "../domain/repository"
import { CreateAnotherAnimeNameUseCase } from "../domain/use-cases"

export class CreateAnotherAnimeName implements CreateAnotherAnimeNameUseCase{
    
    constructor(
        private readonly anotherAnimeNameRepository: AnotherAnimeNameRepository,
    ){}

    execute(createAnotherAnimeNameDto: CreateAnotherAnimeNameDto): Promise<AnotherAnimeName> {
       try {
            return this.anotherAnimeNameRepository.create(createAnotherAnimeNameDto)
       } catch (error) {
            throw error
       }
    }

}