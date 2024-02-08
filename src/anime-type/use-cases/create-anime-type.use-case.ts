import { CreateAnimeTypeDto } from "../domain/dto"
import { AnimeType } from "../domain/entity"
import { AnimeTypeRepository } from "../domain/repository"
import { CreateAnimeTypeUseCase } from "../domain/use-cases"

export class CreateAnimeType implements CreateAnimeTypeUseCase{
    
    constructor(
        private readonly animeTypeRepository: AnimeTypeRepository,
    ){}

    execute(createAnimeTypeDto: CreateAnimeTypeDto): Promise<AnimeType> {
       try {
            return this.animeTypeRepository.create(createAnimeTypeDto)
       } catch (error) {
            throw error
       }
    }

}