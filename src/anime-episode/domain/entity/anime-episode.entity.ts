
interface AnimeEpisodeProps{
    id:string
    animeId: string
    number: number
    isActive: boolean
    updatedAt: Date
    createdAt: Date
}

export class AnimeEpisode{
    public readonly id: string
    public animeId: string
    public number: number
    public isActive: boolean
    public updatedAt: Date
    public createdAt: Date
    
    constructor({ id, animeId, number,createdAt, isActive, updatedAt }: AnimeEpisodeProps){
        this.id = id
        this.animeId = animeId
        this.number = number
        this.isActive =  isActive        
        this.updatedAt = updatedAt        
        this.createdAt = createdAt
    }

}