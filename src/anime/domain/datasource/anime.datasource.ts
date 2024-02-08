import { Criteria } from "../base";
import { CreateAnimeDto } from "../dto";
import { Anime } from "../entity";

export abstract class AnimeDatasource {
    abstract create( createAnimeDto: CreateAnimeDto ): Promise<Anime>
    abstract find( filters?: Criteria<any> ): Promise<Anime[]>
}