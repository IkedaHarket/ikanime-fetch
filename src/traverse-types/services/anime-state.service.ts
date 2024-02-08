
import { AnimeState, CreateAnimeStateDto, CreateAnimeStateUseCase, CriteriaEqualNameAnimeStatePostgres, FindAnimeStateUseCase } from "../../anime-state";
import { CreateLogUseCase } from "../../log";
import { IAnimeStateService } from "../domain/services";

interface AnimeStateServiceProps{
    createLog: CreateLogUseCase
    createAnimeState: CreateAnimeStateUseCase
    findAnimeState: FindAnimeStateUseCase
}

export class AnimeStateService implements IAnimeStateService {

    private readonly createAnimeState: CreateAnimeStateUseCase
    private readonly findAnimeState: FindAnimeStateUseCase
    private readonly createLog: CreateLogUseCase

    constructor({ createLog, createAnimeState, findAnimeState }:AnimeStateServiceProps){
        this.createAnimeState = createAnimeState
        this.findAnimeState = findAnimeState
        this.createLog = createLog
    }

    async createStateIfNotExist( name: string ): Promise<AnimeState>{
        try {
            const animeStates = await this.findAnimeState.execute(new CriteriaEqualNameAnimeStatePostgres(name.toUpperCase()))
            if(animeStates.length > 0){
                return animeStates.at(0)!
            }
            
            const newAnimeState = await this.createAnimeState.execute(new CreateAnimeStateDto({ name }))
            return newAnimeState
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}