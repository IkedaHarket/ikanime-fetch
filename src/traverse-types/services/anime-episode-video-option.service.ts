
import { AnimeEpisodeVideoOption, CompositeFilterAnimeEpisodeVideoOptionPostgres, CreateAnimeEpisodeVideoOptionDto, CreateAnimeEpisodeVideoOptionUseCase, CriteriaEqualEpidoseIdAnimeEpisodeVideoOptionPostgres, FindAnimeEpisodeVideoOptionUseCase } from "../../anime-episode-video-option";
import { CriteriaEqualUrlAnimeEpisodeVideoOptionPostgres } from "../../anime-episode-video-option/infrastructure/datasource/postgres/filters/equal-url-anime-episode-video-option-postgres.criteria";
import { CreateLogUseCase } from "../../log";
import { IAnimeEpisodeVideoOptionService } from "../domain/services";

interface AnimeEpisodeVideoOptionServiceProps{
    createLog: CreateLogUseCase
    createAnimeEpisodeVideoOption: CreateAnimeEpisodeVideoOptionUseCase
    findAnimeEpisodeVideoOption: FindAnimeEpisodeVideoOptionUseCase
}

export class AnimeEpisodeVideoOptionService implements IAnimeEpisodeVideoOptionService {

    private readonly createAnimeEpisodeVideoOption: CreateAnimeEpisodeVideoOptionUseCase
    private readonly findAnimeEpisodeVideoOption: FindAnimeEpisodeVideoOptionUseCase
    private readonly createLog: CreateLogUseCase

    constructor({ createLog, createAnimeEpisodeVideoOption, findAnimeEpisodeVideoOption }:AnimeEpisodeVideoOptionServiceProps){
        this.createAnimeEpisodeVideoOption = createAnimeEpisodeVideoOption
        this.findAnimeEpisodeVideoOption = findAnimeEpisodeVideoOption
        this.createLog = createLog
    }

    async createVideoOptionIfNotExist( createAnimeEpisodeDto: CreateAnimeEpisodeVideoOptionDto ): Promise<AnimeEpisodeVideoOption>{
        try {

            const filterEqualAnimeEpisodeIdId = new CriteriaEqualEpidoseIdAnimeEpisodeVideoOptionPostgres(createAnimeEpisodeDto.episodeId)
            const filterEqualUrl = new CriteriaEqualUrlAnimeEpisodeVideoOptionPostgres(createAnimeEpisodeDto.url)
            const filter = new CompositeFilterAnimeEpisodeVideoOptionPostgres({
                criteria:[filterEqualAnimeEpisodeIdId, filterEqualUrl],
                logic: 'AND'
            })

            const animeEpisodesVideoOptions = await this.findAnimeEpisodeVideoOption.execute(filter)
            if(animeEpisodesVideoOptions.length > 0){
                return animeEpisodesVideoOptions.at(0)!
            }
            
            const newAnimeEpisodeVideoOption = await this.createAnimeEpisodeVideoOption.execute(createAnimeEpisodeDto)
            return newAnimeEpisodeVideoOption
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}