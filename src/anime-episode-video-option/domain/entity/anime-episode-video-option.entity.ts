
interface AnimeEpisodeVideoOptionProps{
    id:string
    episodeId:string
    url:string
    nameServer: string
    isActive: boolean
    updatedAt: Date
    createdAt: Date
}

export class AnimeEpisodeVideoOption{
    public readonly id: string
    public episodeId: string
    public nameServer: string
    public url: string
    public isActive: boolean
    public updatedAt: Date
    public createdAt: Date
    
    constructor({ id, episodeId, nameServer, url, createdAt, isActive, updatedAt }: AnimeEpisodeVideoOptionProps){
        this.id = id
        this.episodeId = episodeId
        this.nameServer = nameServer
        this.url = url
        this.isActive =  isActive        
        this.updatedAt = updatedAt        
        this.createdAt = createdAt
    }

}