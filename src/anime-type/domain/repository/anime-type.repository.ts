import { CreateAnimeTypeDto } from "../dto";
import { Criteria } from "../base";
import { AnimeType } from "../entity";

export abstract class AnimeTypeRepository {
    abstract create( createAnimeTypeDto: CreateAnimeTypeDto ): Promise<AnimeType>
    abstract find( filters?: Criteria<any> ): Promise<AnimeType[]>
}