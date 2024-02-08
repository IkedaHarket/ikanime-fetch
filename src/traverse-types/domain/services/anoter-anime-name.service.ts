import { AnimeType } from "../../../anime-type";
import { AnotherAnimeName, CreateAnotherAnimeNameDto } from "../../../another-anime-name";

export abstract class IAnotherAnimeNameService{ 
    abstract createAnotherAnimeNameIfNotExist(createAnotherAnimeNameDto: CreateAnotherAnimeNameDto): Promise<AnotherAnimeName>
}