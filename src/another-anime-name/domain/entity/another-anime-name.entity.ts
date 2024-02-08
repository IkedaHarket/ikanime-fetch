interface AnotherAnimeNameProps{
    id:string
    name: string
    animeId: string
    isActive: boolean
    updatedAt: Date
    createdAt: Date
}

export class AnotherAnimeName{
    public readonly id: string
    public name: string
    public animeId: string
    public isActive: boolean
    public updatedAt: Date
    public createdAt: Date
    
    constructor({ id, name, animeId, createdAt, isActive, updatedAt }: AnotherAnimeNameProps){
        this.id = id
        this.name = name
        this.isActive =  isActive        
        this.updatedAt = updatedAt        
        this.createdAt = createdAt
        this.animeId = animeId
    }

}