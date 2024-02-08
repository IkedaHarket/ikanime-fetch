import { CreateAnimeDto } from "../domain/dto"
import { Anime } from "../domain/entity"
import { AnimeRepository } from "../domain/repository"
import { CreateAnimeUseCase } from "../domain/use-cases"


export class CreateAnime implements CreateAnimeUseCase{
    
    constructor(
        private readonly animeRepository: AnimeRepository,
    ){}

    execute(createAnimeDto: CreateAnimeDto): Promise<Anime> {
       try {
            return this.animeRepository.create(createAnimeDto)
       } catch (error) {
            throw error
       }
    }

}