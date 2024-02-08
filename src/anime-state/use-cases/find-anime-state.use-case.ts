import { Criteria } from "../domain/base"
import { AnimeState } from "../domain/entity"
import { AnimeStateRepository } from "../domain/repository"
import { FindAnimeStateUseCase } from "../domain/use-cases"

export class FindAnimeState implements FindAnimeStateUseCase{
    
    constructor(
        private readonly animeStateRepository: AnimeStateRepository,
    ){}

    public execute(filters?: Criteria<any>): Promise<AnimeState[]> {
        try {
            return this.animeStateRepository.find(filters)
        } catch (error) {
            throw error
        }
    }

}