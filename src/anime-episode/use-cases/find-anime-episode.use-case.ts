import { Criteria } from "../domain/base"
import { AnimeEpisode } from "../domain/entity"
import { AnimeEpisodeRepository } from "../domain/repository"
import { FindAnimeEpisodeUseCase } from "../domain/use-cases"

export class FindAnimeEpisode implements FindAnimeEpisodeUseCase{
    
    constructor(
        private readonly animeEpisodeRepository: AnimeEpisodeRepository,
    ){}

    public execute(filters?: Criteria<any>): Promise<AnimeEpisode[]> {
        try {
            return this.animeEpisodeRepository.find(filters)
        } catch (error) {
            throw error
        }
    }

}