import * as AnimeCategory from "../../anime-category"
import { CreateLogUseCase } from "../../log"
import { IAnimeCategoryService } from "../domain/services"

interface AnimeCategoryServiceProps{
    createLog: CreateLogUseCase
    createAnimeCategory: AnimeCategory.CreateAnimeCategoryUseCase
    findAnimeCategory: AnimeCategory.FindAnimeCategoryUseCase
    createAnimeCategoryHub: AnimeCategory.CreateAnimeCategoryHubUseCase
    findAnimeCategoryHub: AnimeCategory.FindAnimeCategoryHubUseCase
}

export class AnimeCategoryService implements IAnimeCategoryService {

    private readonly createAnimeCategory: AnimeCategory.CreateAnimeCategoryUseCase
    private readonly findAnimeCategory: AnimeCategory.FindAnimeCategoryUseCase
    private readonly createAnimeCategoryHub: AnimeCategory.CreateAnimeCategoryHubUseCase
    private readonly findAnimeCategoryHub: AnimeCategory.FindAnimeCategoryHubUseCase
    private readonly createLog: CreateLogUseCase

    constructor({ 
        createLog, 
        createAnimeCategory, 
        findAnimeCategory,
        createAnimeCategoryHub,
        findAnimeCategoryHub
    }: AnimeCategoryServiceProps){
        this.createAnimeCategory = createAnimeCategory
        this.findAnimeCategory = findAnimeCategory
        this.createAnimeCategoryHub = createAnimeCategoryHub
        this.findAnimeCategoryHub = findAnimeCategoryHub
        this.createLog = createLog
    }

    async createCategoryIfNotExist( animeId: string , categoryName: string ): Promise<AnimeCategory.AnimeCategoryHub>{
        try {
            let animeCategories = await this.findAnimeCategory.execute(new AnimeCategory.CriteriaEqualNameAnimeCategoryPostgres(categoryName.toUpperCase()))
            if(animeCategories.length === 0){
                animeCategories.push(
                        await this.createAnimeCategory.execute(new AnimeCategory.CreateAnimeCategoryDto({ name: categoryName }))
                    )
            }
            const animeCategorie = animeCategories.at(0)! //? Por negocio solo puede haber uno

            const categoryHubEqualAnime = new AnimeCategory.CriteriaEqualAnimeIdAnimeCategoryHubPostgres(animeId)
            const categoryHubEqualCategory = new AnimeCategory.CriteriaEqualAnimeCategoryIdAnimeCategoryHubPostgres(animeCategorie.id)
            const filter = new AnimeCategory.CompositeFilterAnimeCategoryHubPostgres({
                criteria: [categoryHubEqualAnime,categoryHubEqualCategory],
                logic: 'AND'
            })

            const animeCategoriesHub = await this.findAnimeCategoryHub.execute(filter)
            if( animeCategoriesHub.length > 0 ){
                return animeCategoriesHub.at(0)!
            } 
            return await this.createAnimeCategoryHub.execute(new AnimeCategory.CreateAnimeCategoryHubDto({
                categoryId: animeCategorie.id,
                animeId                
            }))

        } catch (error) {
            console.log(error)
            throw error
        }
    }

}