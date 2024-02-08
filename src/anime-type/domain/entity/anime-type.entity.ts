
interface AnimeTypeProps{
    id:string
    name:string
    isActive: boolean
    updatedAt: Date
    createdAt: Date
}

export class AnimeType{
    public readonly id: string
    public name: string
    public isActive: boolean
    public updatedAt: Date
    public createdAt: Date
    
    constructor({ id, name, createdAt, isActive, updatedAt }: AnimeTypeProps){
        this.id = id
        this.name = name
        this.isActive =  isActive        
        this.updatedAt = updatedAt        
        this.createdAt = createdAt
    }

}