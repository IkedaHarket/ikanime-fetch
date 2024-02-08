import { Anime, CreateAnimeDto, Criteria } from "../../../anime";
import { FindAnimeFilters } from "../interfaces";


export abstract class IAnimeService{ 
    abstract createAnimeIfNotExist(createAnime:CreateAnimeDto): Promise<Anime>
    abstract find(filter ?: FindAnimeFilters): Promise<Anime[]>
}