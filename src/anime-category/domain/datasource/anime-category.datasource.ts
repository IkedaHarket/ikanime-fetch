import { Criteria } from "../base";
import { CreateAnimeCategoryDto } from "../dto";
import { AnimeCategory } from "../entity";

export abstract class AnimeCategoryDatasource {
    abstract create( createAnimeCategoryDto: CreateAnimeCategoryDto ): Promise<AnimeCategory>
    abstract find( filters?: Criteria<any> ): Promise<AnimeCategory[]>
}