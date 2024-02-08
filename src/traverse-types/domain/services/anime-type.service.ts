import { AnimeType } from "../../../anime-type";

export abstract class IAnimeTypeService{ 
    abstract createTypeIfNotExist(name:string): Promise<AnimeType>
}