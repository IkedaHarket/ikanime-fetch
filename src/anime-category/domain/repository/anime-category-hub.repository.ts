import { Criteria } from "../base";
import { CreateAnimeCategoryHubDto } from "../dto/create-anime-category-hub.dto";
import { AnimeCategoryHub } from "../entity";

export abstract class AnimeCategoryHubRepository {
    abstract create( reateAnimeCategoryHubDto: CreateAnimeCategoryHubDto ): Promise<AnimeCategoryHub>
    abstract find( filters?: Criteria<any> ): Promise<AnimeCategoryHub[]>
}