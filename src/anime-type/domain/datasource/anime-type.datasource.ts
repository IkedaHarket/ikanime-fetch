import { Criteria } from "../base";
import { CreateAnimeTypeDto } from "../dto";
import { AnimeType } from "../entity";

export abstract class AnimeTypeDatasource {
    abstract create( createAnimeTypeDto: CreateAnimeTypeDto ): Promise<AnimeType>
    abstract find( filters?: Criteria<any> ): Promise<AnimeType[]>
}