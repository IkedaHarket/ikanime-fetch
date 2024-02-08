
interface AnimeStateProps{
    id:string
    name:string
    isActive: boolean
    updatedAt: Date
    createdAt: Date
}

export class AnimeState{
    public readonly id: string
    public name: string
    public isActive: boolean
    public updatedAt: Date
    public createdAt: Date
    
    constructor({ id, name, createdAt, isActive, updatedAt }: AnimeStateProps){
        this.id = id
        this.name = name
        this.isActive =  isActive        
        this.updatedAt = updatedAt        
        this.createdAt = createdAt
    }

}