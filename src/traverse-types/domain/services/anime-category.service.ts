import { AnimeCategoryHub } from "../../../anime-category";

export abstract class IAnimeCategoryService{ 
    abstract createCategoryIfNotExist(animeId:string , categoryName:string): Promise<AnimeCategoryHub>
}