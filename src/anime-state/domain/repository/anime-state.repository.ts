
import { Criteria } from "../base";
import { CreateAnimeStateDto } from "../dto";
import { AnimeState } from "../entity";

export abstract class AnimeStateRepository {
    abstract create( createAnimeStateDto: CreateAnimeStateDto ): Promise<AnimeState>
    abstract find( filters?: Criteria<any> ): Promise<AnimeState[]>
}