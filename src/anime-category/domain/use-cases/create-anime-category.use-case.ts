import { CreateAnimeCategoryDto } from "../dto";
import { AnimeCategory } from "../entity";

export abstract class CreateAnimeCategoryUseCase{
    public abstract execute(createAnimeCategoryDto: CreateAnimeCategoryDto): Promise<AnimeCategory>
}