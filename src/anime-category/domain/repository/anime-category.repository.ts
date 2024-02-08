import { Criteria } from "../base";
import { CreateAnimeCategoryDto } from "../dto";
import { AnimeCategory } from "../entity";

export abstract class AnimeCategoryRepository {
    abstract create( reateAnimeCategoryDto: CreateAnimeCategoryDto ): Promise<AnimeCategory>
    abstract find( filters?: Criteria<any> ): Promise<AnimeCategory[]>
}