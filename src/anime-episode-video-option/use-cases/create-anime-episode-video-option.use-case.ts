import { CreateAnimeEpisodeVideoOptionDto } from "../domain/dto"
import { AnimeEpisodeVideoOption } from "../domain/entity"
import { AnimeEpisodeVideoOptionRepository } from "../domain/repository"
import { CreateAnimeEpisodeVideoOptionUseCase } from "../domain/use-cases"

export class CreateAnimeEpisodeVideoOption implements CreateAnimeEpisodeVideoOptionUseCase{
    
    constructor(
        private readonly animeEpisodeVideoOptionRepository: AnimeEpisodeVideoOptionRepository,
    ){}

    execute(createAnimeEpisodeVideoOptionDto: CreateAnimeEpisodeVideoOptionDto): Promise<AnimeEpisodeVideoOption> {
       try {
            return this.animeEpisodeVideoOptionRepository.create(createAnimeEpisodeVideoOptionDto)
       } catch (error) {
            throw error
       }
    }

}