import { Criteria } from "../domain/base"
import { Anime } from "../domain/entity"
import { AnimeRepository } from "../domain/repository"
import { FindAnimeUseCase } from "../domain/use-cases"

export class FindAnime implements FindAnimeUseCase{
    
    constructor(
        private readonly animeRepository: AnimeRepository,
    ){}

    public execute(filters?: Criteria<any>): Promise<Anime[]> {
        try {
            return this.animeRepository.find(filters)
        } catch (error) {
            throw error
        }
    }

}