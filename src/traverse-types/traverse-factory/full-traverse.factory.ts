import { Traverse, TraverseFactory } from "../domain/base"
import { CreateLog, LogPostgresDatasource, LogRepositoryImpl } from "../../log"

import { FullTraverseStrategy } from "../traverse-strategies"
import { PuppeterNavigator } from "../navigators"
import { Prisma } from "../../core"
import { FullServiceFactory } from "../services-factory/full-factory-service"


export class FullTraverseFactory implements TraverseFactory{
    
    constructor(
        private readonly FIRST_PAGE: number,
    ){}

    createTraverse(): Traverse {

        const browser = new PuppeterNavigator()
        const prismaClient = Prisma.getInstance().prismaClient

        const logDatasource = new LogPostgresDatasource(prismaClient)
        const logRepository = new LogRepositoryImpl(logDatasource)
        const createLog = new CreateLog(logRepository)

        const serviceFactory = new FullServiceFactory(createLog)

        return new FullTraverseStrategy({
            firstPage: this.FIRST_PAGE,
            browser,
            animeStateService: serviceFactory.createAnimeStateService(), 
            animeTypeService: serviceFactory.createAnimetypeService(),
            animeService: serviceFactory.createAnimeService(),
            anotherAnimeNameService: serviceFactory.createAnotherAnimeService(),
            animeEpisodeService: serviceFactory.createAnimeEpisodeService(),
            animeEpisodeVideoOptionService: serviceFactory.createAnimeEpisodeVideoOptionService(),
            animeCategoryService: serviceFactory.createAnimeCategoryService()
        } )
    }

}