import { CreateAnimeEpisodeDto } from "../domain/dto"
import { AnimeEpisode } from "../domain/entity"
import { AnimeEpisodeRepository } from "../domain/repository"
import { CreateAnimeEpisodeUseCase } from "../domain/use-cases"


export class CreateAnimeEpisode implements CreateAnimeEpisodeUseCase{
    
    constructor(
        private readonly animeEpisodeRepository: AnimeEpisodeRepository,
    ){}

    execute(createAnimeEpisodeDto: CreateAnimeEpisodeDto): Promise<AnimeEpisode> {
       try {
            return this.animeEpisodeRepository.create(createAnimeEpisodeDto)
       } catch (error) {
            throw error
       }
    }

}