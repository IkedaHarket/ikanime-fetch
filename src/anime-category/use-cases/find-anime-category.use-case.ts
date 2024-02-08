import { Criteria } from "../domain/base"
import { AnimeCategory } from "../domain/entity"
import { AnimeCategoryRepository } from "../domain/repository"
import { FindAnimeCategoryUseCase } from "../domain/use-cases"

export class FindAnimeCategory implements FindAnimeCategoryUseCase{
    
    constructor(
        private readonly animeCategoryRepository: AnimeCategoryRepository,
    ){}

    public execute(filters?: Criteria<any>): Promise<AnimeCategory[]> {
        try {
            return this.animeCategoryRepository.find(filters)
        } catch (error) {
            throw error
        }
    }

}