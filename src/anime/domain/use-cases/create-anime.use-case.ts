import { CreateAnimeDto } from "../dto";
import { Anime } from "../entity";



export abstract class CreateAnimeUseCase{
    public abstract execute(createAnimeDto: CreateAnimeDto): Promise<Anime>
}