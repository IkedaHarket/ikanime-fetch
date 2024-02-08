import { CreateAnimeTypeDto } from "../dto";
import { AnimeType } from "../entity";

export abstract class CreateAnimeTypeUseCase{
    public abstract execute(createAnimeTypeDto: CreateAnimeTypeDto): Promise<AnimeType>
}