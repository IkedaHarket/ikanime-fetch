import { AnimeState } from "../../../anime-state";

export abstract class IAnimeStateService{ 
    abstract createStateIfNotExist(name:string): Promise<AnimeState>
}