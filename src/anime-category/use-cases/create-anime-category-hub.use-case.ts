import { CreateAnimeCategoryHubDto } from "../domain/dto"
import { AnimeCategoryHub } from "../domain/entity"
import { AnimeCategoryHubRepository } from "../domain/repository"
import { CreateAnimeCategoryHubUseCase } from "../domain/use-cases"

export class CreateAnimeCategoryHub implements CreateAnimeCategoryHubUseCase{
    
    constructor(
        private readonly animeCategoryHubRepository: AnimeCategoryHubRepository,
    ){}

    execute(createAnimeCategoryHubDto: CreateAnimeCategoryHubDto): Promise<AnimeCategoryHub> {
       try {
            return this.animeCategoryHubRepository.create(createAnimeCategoryHubDto)
       } catch (error) {
            throw error
       }
    }

}