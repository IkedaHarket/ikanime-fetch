import { CreateAnimeCategoryDto } from "../domain/dto"
import { AnimeCategory } from "../domain/entity"
import { AnimeCategoryRepository } from "../domain/repository"
import { CreateAnimeCategoryUseCase } from "../domain/use-cases"

export class CreateAnimeCategory implements CreateAnimeCategoryUseCase{
    
    constructor(
        private readonly animeCategoryRepository: AnimeCategoryRepository,
    ){}

    execute(createAnimeCategoryDto: CreateAnimeCategoryDto): Promise<AnimeCategory> {
       try {
            return this.animeCategoryRepository.create(createAnimeCategoryDto)
       } catch (error) {
            throw error
       }
    }

}