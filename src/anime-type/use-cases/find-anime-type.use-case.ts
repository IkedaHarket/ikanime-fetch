import { Criteria } from "../domain/base"
import { AnimeType } from "../domain/entity"
import { AnimeTypeRepository } from "../domain/repository"
import { FindAnimeTypeUseCase } from "../domain/use-cases"

export class FindAnimeType implements FindAnimeTypeUseCase{
    
    constructor(
        private readonly animeTypeRepository: AnimeTypeRepository,
    ){}

    public execute(filters?: Criteria<any>): Promise<AnimeType[]> {
        try {
            return this.animeTypeRepository.find(filters)
        } catch (error) {
            throw error
        }
    }

}