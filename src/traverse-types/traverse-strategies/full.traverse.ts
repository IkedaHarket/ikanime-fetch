
import { BrowserNavigator, Traverse } from "../domain/base";
import { IAnimeCategoryService, IAnimeEpisodeService, IAnimeEpisodeVideoOptionService, IAnimeService, IAnimeStateService, IAnimeTypeService, IAnotherAnimeNameService } from "../domain/services";
import { Anime, CreateAnimeDto } from "../../anime";
import { CreateAnotherAnimeNameDto } from "../../another-anime-name";
import { AnimeEpisode, CreateAnimeEpisodeDto } from "../../anime-episode";
import { VideoNavigator } from "../domain/interfaces";
import { AnimeState } from "../../anime-state";
import { AnimeType } from "../../anime-type";
import { CreateAnimeEpisodeVideoOptionDto } from "../../anime-episode-video-option";

  
export interface FullTraverseStategyProps{
    browser: BrowserNavigator
    firstPage: number,
    animeStateService: IAnimeStateService,
    animeTypeService: IAnimeTypeService,
    animeService: IAnimeService,
    anotherAnimeNameService: IAnotherAnimeNameService,
    animeEpisodeService: IAnimeEpisodeService,
    animeEpisodeVideoOptionService: IAnimeEpisodeVideoOptionService,
    animeCategoryService: IAnimeCategoryService
}

export class FullTraverseStrategy implements Traverse{

    private readonly FIRST_PAGE: number
    private readonly browser: BrowserNavigator
    private readonly animeStateService: IAnimeStateService
    private readonly animeTypeService: IAnimeTypeService
    private readonly animeService: IAnimeService
    private readonly anotherAnimeNameService: IAnotherAnimeNameService
    private readonly animeEpisodeService: IAnimeEpisodeService
    private readonly animeEpisodeVideoOptionService: IAnimeEpisodeVideoOptionService
    private readonly animeCategoryService: IAnimeCategoryService

    private allowedPages: string[] = ['https://www3.animeflv.net/','about:blank']
    private animeState ?: AnimeState
    private animeType ?: AnimeType
    private anime ?: Anime
    private animeEpisode ?: AnimeEpisode
    private animeEpisodeUrls ?: string[]

    constructor( { 
                firstPage, 
                browser,
                animeStateService, 
                animeTypeService, 
                animeService,
                anotherAnimeNameService,
                animeEpisodeService,
                animeEpisodeVideoOptionService,
                animeCategoryService }: FullTraverseStategyProps ){
        this.FIRST_PAGE = firstPage
        this.browser = browser
        this.animeStateService = animeStateService
        this.animeTypeService = animeTypeService
        this.animeService = animeService
        this.anotherAnimeNameService = anotherAnimeNameService
        this.animeEpisodeService = animeEpisodeService
        this.animeEpisodeVideoOptionService = animeEpisodeVideoOptionService
        this.animeCategoryService = animeCategoryService
    }

    public async execute(): Promise<boolean>{
        await this.browser.initializaBrowser()
        this.browser.allowOnlyPagesOf(this.allowedPages)
        await this.browser.newPage();
        await this.browser.goto('https://www3.animeflv.net/')
        
        const directorypath = (await this.browser.getMultiplePathsOfAnchorTag(`body > div.Wrapper > header > div > div > div > div.AFixed > nav > ul > li > a[href="/browse"]`))[0]
        
        for (let currentPage = this.FIRST_PAGE; currentPage > 0; currentPage--) {
            await this.browser.goto(`${directorypath}?page=${currentPage}`)
            console.log(`Recorreindo la pagina ${currentPage}`)
    
            const animePaths = await this.browser.getMultiplePathsOfAnchorTag(`body > div.Wrapper > div > div > main > ul > li > article > a`)
            for (const animePath of animePaths.reverse()) {
                await this.browser.goto(animePath)
                console.log(`Entrando al anime ${animePath}`)
                await this.handlerAllDataAnimePage()
                
                await this.setAnimeEpisodeUrls()

                for (const animeEpisodePath of this.animeEpisodeUrls!.reverse()) {
                    await this.browser.goto(animeEpisodePath)
                    console.log(`Entrando al capitulo ${animeEpisodePath}`)

                    await this.handlerEpisode()
                    await this.handlerAnimeEpisodeVideoOptions()

                }
    
            }
        }
        await this.browser.closeBrowser()
        return true;
    }

    private async handlerAllDataAnimePage(): Promise<void>{
        await this.handlerAnimeState()
        await this.handlerAnimeType()
        await this.handlerAnime()
        await this.handlerAnotherAnimeName()
        await this.handlerCategories()
    }
    private async handlerCategories(){
        if(!this.anime) return
        const categories = await this.browser.getMultipleTextValues(`body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a`)
        categories.map( async (category) => {
                await this.animeCategoryService.createCategoryIfNotExist( this.anime?.id! ,category)
        })
    }

    private async handlerAnimeState(): Promise<void>{
        const stateAnimeName = await this.browser.getTextValue('body > div.Wrapper > div > div > div.Container > div > aside > p > span')
        this.animeState = await this.animeStateService.createStateIfNotExist(stateAnimeName)
    }


    private async handlerAnimeType(): Promise<void>{
        const animeTypeName = await this.browser.getTextValue('body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > span')
        this.animeType = await this.animeTypeService.createTypeIfNotExist(animeTypeName)
    }


    private async handlerAnime(): Promise<void>{
        if( !this.animeState || !this.animeType ) return

        const animeName = await this.browser.getTextValue('body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > h1')
        const animeDescription = await this.browser.getTextValue('body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > div.Description > p')
        const animeUniqueName = await this.browser.getLastPathUrl()
        let nextEpisode ;
        try {
            nextEpisode = await this.browser.getTextValue('#episodeList > li.fa-play-circle.Next > a > span')
        } catch (error) {
            nextEpisode = undefined
        }
            
        this.anime = await this.animeService.createAnimeIfNotExist(new CreateAnimeDto({
            name: animeName,
            description: animeDescription,
            stateId: this.animeState.id,
            typeId: this.animeType.id,
            uniqueName: animeUniqueName,
            nextEpisode: nextEpisode ? new Date(nextEpisode) : undefined  
        }))
    }


    private async handlerAnotherAnimeName(): Promise<void>{
        if( !this.anime ) return

        const anotherAnimeNames = await this.browser.getMultipleTextValues('body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > div:nth-child(3) > span')
        anotherAnimeNames.map( async (anotherAnimeName) => {
            await this.anotherAnimeNameService.createAnotherAnimeNameIfNotExist(new CreateAnotherAnimeNameDto({
                animeId: this.anime!.id,
                name: anotherAnimeName
            }))
        } )
    }

    private async setAnimeEpisodeUrls(): Promise<void>{
        const episodes = await this.browser.getEpisodes()
        this.animeEpisodeUrls = episodes.map( episode => (
            `https://www3.animeflv.net/ver/${this.anime!.uniqueName}-${episode}`
        ))
    }

    private async handlerEpisode(): Promise<void>{
        if( !this.anime ) return

        const episode = await this.browser.getTextValue('#XpndCn > div.CpCnA > div.CapiTop > h1')
        let episodeNumber = isNaN(Number(episode.split(' ').at(-1))) ? -1 : Number(episode.split(' ').at(-1))

        if( this.isMovie(episodeNumber) ) episodeNumber = 1

        this.animeEpisode = await this.animeEpisodeService.createEpisodeIfNotExist(new CreateAnimeEpisodeDto({
            animeId: this.anime!.id,
            number: episodeNumber
        }))

    }

    private isMovie(episodeNumber: number){
        //TODO mejorar
        return episodeNumber === -1
    }

    private async handlerAnimeEpisodeVideoOptions(): Promise<void>{
        if( !this.animeEpisode ) return
        const videos: VideoNavigator[] = await this.browser.getVideos()
        videos.map( async(video) => {
            await this.animeEpisodeVideoOptionService.createVideoOptionIfNotExist(
                new CreateAnimeEpisodeVideoOptionDto({
                    episodeId: this.animeEpisode!.id,
                    nameServer: video.nameServer,
                    url: video.url,
                })
            )
        })
    }
}