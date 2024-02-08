
import { AnimeEpisode, CompositeFilterAnimeEpisodePostgres, CreateAnimeEpisodeDto, CreateAnimeEpisodeUseCase, CriteriaEqualAnimeIdAnimeEpisodePostgres, FindAnimeEpisodeUseCase } from "../../anime-episode";
import { CriteriaEqualNumberAnimeEpisodePostgres } from "../../anime-episode/infrastructure/datasource/postgres/filters/equal-number-anime-episode-postgres.criteria";
import { CreateLogUseCase } from "../../log";
import { IAnimeEpisodeService } from "../domain/services";

interface AnimeEpisodeServiceProps{
    createLog: CreateLogUseCase
    createAnimeEpisode: CreateAnimeEpisodeUseCase
    findAnimeEpisode: FindAnimeEpisodeUseCase
}

export class AnimeEpisodeService implements IAnimeEpisodeService {

    private readonly createAnimeEpisode: CreateAnimeEpisodeUseCase
    private readonly findAnimeEpisode: FindAnimeEpisodeUseCase
    private readonly createLog: CreateLogUseCase

    constructor({ createLog, createAnimeEpisode, findAnimeEpisode }:AnimeEpisodeServiceProps){
        this.createAnimeEpisode = createAnimeEpisode
        this.findAnimeEpisode = findAnimeEpisode
        this.createLog = createLog
    }

    async createEpisodeIfNotExist( createAnimeEpisodeDto: CreateAnimeEpisodeDto ): Promise<AnimeEpisode>{
        try {

            const episodeNumber = createAnimeEpisodeDto.number 

            const filterEqualAnimeId = new CriteriaEqualAnimeIdAnimeEpisodePostgres(createAnimeEpisodeDto.animeId)
            const filterEqualNumber = new CriteriaEqualNumberAnimeEpisodePostgres(createAnimeEpisodeDto.number)
            const filter = new CompositeFilterAnimeEpisodePostgres({
                criteria:[filterEqualAnimeId, filterEqualNumber],
                logic: 'AND'
            })

            const animeEpisodes = await this.findAnimeEpisode.execute(filter)
            if(animeEpisodes.length > 0){
                return animeEpisodes.at(0)!
            }
            
            const newAnimeEpisode = await this.createAnimeEpisode.execute(createAnimeEpisodeDto)
            return newAnimeEpisode
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}