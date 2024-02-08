
import { CreateAnimeCategoryHubDto } from "../dto/create-anime-category-hub.dto";
import { AnimeCategoryHub } from "../entity";

export abstract class CreateAnimeCategoryHubUseCase{
    public abstract execute(createAnimeCategoryHubDto: CreateAnimeCategoryHubDto): Promise<AnimeCategoryHub>
}