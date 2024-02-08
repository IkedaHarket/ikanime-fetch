import { VideoNavigator } from "../interfaces";

export abstract class BrowserNavigator{
    abstract initializaBrowser(): Promise<void>
    abstract allowOnlyPagesOf(pagesurl: string[]): Promise<void>
    abstract getLastPathUrl(): Promise<string>
    abstract getMultiplePathsOfAnchorTag(htmlSelector: string): Promise<string[]>
    abstract getMultipleTextValues(htmlSelector: string): Promise<string[]>
    abstract getTextValue(htmlSelector: string): Promise<string>
    abstract goto(url: string): Promise<void>
    abstract newPage(): Promise<void>
    abstract closeBrowser(): Promise<void>
    
    //Todo esto deberia ser una interfaz
    abstract getEpisodes(): Promise<number[]>
    abstract getVideos(): Promise<VideoNavigator[]>
}