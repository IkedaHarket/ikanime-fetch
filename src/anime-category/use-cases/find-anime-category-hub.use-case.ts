import { Criteria } from "../domain/base"
import { AnimeCategory, AnimeCategoryHub } from "../domain/entity"
import { AnimeCategoryHubRepository } from "../domain/repository"
import { FindAnimeCategoryHubUseCase } from "../domain/use-cases"

export class FindAnimeCategoryHub implements FindAnimeCategoryHubUseCase{
    
    constructor(
        private readonly animeCategoryHubRepository: AnimeCategoryHubRepository,
    ){}

    public execute(filters?: Criteria<any>): Promise<AnimeCategoryHub[]> {
        try {
            return this.animeCategoryHubRepository.find(filters)
        } catch (error) {
            throw error
        }
    }

}