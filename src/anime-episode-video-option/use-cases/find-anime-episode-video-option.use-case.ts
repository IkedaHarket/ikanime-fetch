import { Criteria } from "../domain/base"
import { AnimeEpisodeVideoOption } from "../domain/entity"
import { AnimeEpisodeVideoOptionRepository } from "../domain/repository"
import { FindAnimeEpisodeVideoOptionUseCase } from "../domain/use-cases"

export class FindAnimeEpisodeVideoOption implements FindAnimeEpisodeVideoOptionUseCase{
    
    constructor(
        private readonly animeEpisodeVideoOptionRepository: AnimeEpisodeVideoOptionRepository,
    ){}

    public execute(filters?: Criteria<any>): Promise<AnimeEpisodeVideoOption[]> {
        try {
            return this.animeEpisodeVideoOptionRepository.find(filters)
        } catch (error) {
            throw error
        }
    }

}