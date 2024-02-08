import puppeteer, { Browser, Page, Target } from "puppeteer";
import { BrowserNavigator } from "../domain/base";
import { VideoNavigator } from "../domain/interfaces";

declare global {
    interface Window {
      videos: any;
      episodes : [number,number][]
    }
}

export class PuppeterNavigator implements BrowserNavigator{

    private browser !: Browser;
    private currentPage !: Page;
    
    async initializaBrowser(): Promise<void> {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        })
        if(!browser) throw new Error('Browser not initialize')
        this.browser = browser
    }

    
    async allowOnlyPagesOf(pageUrls: string[]): Promise<void> {
        this.browser.on('targetcreated', async target => {
            const newPage = await target.page();
            for (const pageUrl of pageUrls) {
                if(newPage?.url().includes(pageUrl)) return 
            }
            if(newPage) await newPage?.close();
        });
    }

    
    async newPage(): Promise<void> {
        this.currentPage = await this.browser.newPage();
    }

    
    async goto(url: string): Promise<void> {
        await this.currentPage.goto(url, { timeout: 90000 } )
    }

    
    async getMultipleTextValues(htmlSelector: string): Promise<string[]> {
        return await this.currentPage.evaluate( ( htmlSelector ) => {
            const htmlElements = document.querySelectorAll(htmlSelector)
            if( !htmlElements ) return []
            if( htmlElements.length === 0 ) return []
            return ([...htmlElements] as HTMLElement[]).map( element => element.innerText )
        }, htmlSelector)
    }
    
    
    async getTextValue(htmlSelector: string): Promise<string> {
        return await this.currentPage.evaluate( (htmlSelector) => {
            const spanElements = document.querySelectorAll(htmlSelector)
            if( spanElements.length === 0 ) throw new Error('Element not found')
            return ([...spanElements].at(0) as HTMLElement).innerText || ''
        }, htmlSelector)
    }
    
    
    async getMultiplePathsOfAnchorTag(htmlSelector: string): Promise<string[]> {
        return this.currentPage.evaluate( (htmlSelector) => {
            const anchorElements = document.querySelectorAll(htmlSelector)
            if( anchorElements.length === 0 ) throw new Error('Anchor element not found')
            return [...anchorElements].map( anchorElement => (anchorElement as HTMLAnchorElement).href || '')
        }, htmlSelector)
    }


    async getEpisodes(): Promise<number[]> {
        return await this.currentPage.evaluate( () => {
            const episodes: [number,number][] = window.episodes!
            if( !episodes ) throw new Error(`episodes not found in script`)
            if(episodes.length === 0) return []
            return episodes.map((episode) => ( episode.at(0) || -1 ))
        })
    }


    async getLastPathUrl(): Promise<string> {
        return await this.currentPage.evaluate( () => {
            const url = new URL(location.href)
            const uniqueName = url.pathname.split('/').at(-1)
            if( !uniqueName ) throw new Error('UniqueName not found in url')
            return uniqueName
        })
    }


    async getVideos(): Promise<VideoNavigator[]> {
        return this.currentPage.evaluate( () => {
            const videos: any= window.videos!
            if( !videos ) throw new Error(`videos not found in script`)
            if(videos.length === 0) return []
            return videos.SUB.map((video:any) => ({nameServer:video?.title, url: video?.code || video?.url}))
        })
    }


    async closeBrowser(): Promise<void> {
        await this.browser.close();
    }

}