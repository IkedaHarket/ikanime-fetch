
import { Anime, CompositeFilterAnimePostgres, CreateAnimeDto, CreateAnimeUseCase, Criteria, CriteriaEqualUniqueNameAnimePostgres, FindAnimeUseCase } from "../../anime";
import { CreateLogUseCase } from "../../log";
import { FindAnimeFilters } from "../domain/interfaces";
import { IAnimeService } from "../domain/services";

interface AnimeServiceProps{
    createLog: CreateLogUseCase
    createAnime: CreateAnimeUseCase
    findAnime: FindAnimeUseCase
}

export class AnimeService implements IAnimeService {

    private readonly createAnime: CreateAnimeUseCase
    private readonly findAnime: FindAnimeUseCase
    private readonly createLog: CreateLogUseCase

    constructor({ createLog, createAnime, findAnime }:AnimeServiceProps){
        this.createAnime = createAnime
        this.findAnime = findAnime
        this.createLog = createLog
    }

    async createAnimeIfNotExist( createAnimeDto: CreateAnimeDto ): Promise<Anime>{
        try {
            const anime = await this.findAnime.execute(new CriteriaEqualUniqueNameAnimePostgres(createAnimeDto.uniqueName))
            if(anime.length > 0){
                return anime.at(0)!
            }
            
            const newAnime = await this.createAnime.execute(createAnimeDto)
            return newAnime
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async find(filter ?: FindAnimeFilters): Promise<Anime[]>{
        try {
            if( !filter ) return await this.findAnime.execute()
            const { type, logic = 'AND' } = filter

            let filters: Criteria<any>[] = []

            if( type ) filters.push(new CriteriaEqualUniqueNameAnimePostgres(type))
            
            const criteriaLogic = new CompositeFilterAnimePostgres({
                criteria: filters,
                logic
            })

            return await this.findAnime.execute(criteriaLogic)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

}