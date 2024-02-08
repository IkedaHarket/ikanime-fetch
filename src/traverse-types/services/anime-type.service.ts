import { AnimeType, CreateAnimeTypeDto, CreateAnimeTypeUseCase, CriteriaEqualNameAnimeTypePostgres, FindAnimeTypeUseCase } from "../../anime-type"
import { CreateLogUseCase } from "../../log"
import { IAnimeTypeService } from "../domain/services"

interface AnimeTypeServiceProps{
    createLog: CreateLogUseCase
    createAnimeType: CreateAnimeTypeUseCase
    findAnimeType: FindAnimeTypeUseCase
}

export class AnimeTypeService implements IAnimeTypeService {

    private readonly createAnimeType: CreateAnimeTypeUseCase
    private readonly findAnimeType: FindAnimeTypeUseCase
    private readonly createLog: CreateLogUseCase

    constructor({ createLog, createAnimeType, findAnimeType }:AnimeTypeServiceProps){
        this.createAnimeType = createAnimeType
        this.findAnimeType = findAnimeType
        this.createLog = createLog
    }

    async createTypeIfNotExist( name: string ): Promise<AnimeType>{
        try {
            const animeTypes = await this.findAnimeType.execute(new CriteriaEqualNameAnimeTypePostgres(name.toUpperCase()))
            if(animeTypes.length > 0){
                return animeTypes.at(0)!
            }
            
            const newAnimeType = await this.createAnimeType.execute(new CreateAnimeTypeDto({ name }))
            return newAnimeType
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}