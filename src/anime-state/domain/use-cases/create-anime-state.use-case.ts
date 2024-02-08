import { CreateAnimeStateDto } from "../dto";
import { AnimeState } from "../entity";


export abstract class CreateAnimeStateUseCase{
    public abstract execute(createAnimeStateDto: CreateAnimeStateDto): Promise<AnimeState>
}