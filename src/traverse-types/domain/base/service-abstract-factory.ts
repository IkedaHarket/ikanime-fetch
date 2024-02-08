import * as IServices from "../services";

export abstract class ServiceFactory {
    abstract createAnimeStateService(): IServices.IAnimeStateService
    abstract createAnimetypeService(): IServices.IAnimeTypeService
    abstract createAnimeService(): IServices.IAnimeService
    abstract createAnotherAnimeService(): IServices.IAnotherAnimeNameService
    abstract createAnimeEpisodeService(): IServices.IAnimeEpisodeService
    abstract createAnimeEpisodeVideoOptionService(): IServices.IAnimeEpisodeVideoOptionService
    abstract createAnimeCategoryService(): IServices.IAnimeCategoryService
} 