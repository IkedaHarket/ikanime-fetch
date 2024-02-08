import { CreateAnimeStateDto } from "../domain/dto"
import { AnimeState } from "../domain/entity"
import { AnimeStateRepository } from "../domain/repository"
import { CreateAnimeStateUseCase } from "../domain/use-cases"


export class CreateAnimeState implements CreateAnimeStateUseCase{
    
    constructor(
        private readonly animeStateRepository: AnimeStateRepository,
    ){}

    execute(createAnimeStateDto: CreateAnimeStateDto): Promise<AnimeState> {
       try {
            return this.animeStateRepository.create(createAnimeStateDto)
       } catch (error) {
            throw error
       }
    }

}