interface AnimeCategoryHubProps{
    id:string
    animeId: string
    categoryId: string
    isActive: boolean
    updatedAt: Date
    createdAt: Date
}

export class AnimeCategoryHub{
    public readonly id: string
    public animeId: string
    public categoryId: string
    public isActive: boolean
    public updatedAt: Date
    public createdAt: Date
    
    constructor({ id, animeId, categoryId, createdAt, isActive, updatedAt }: AnimeCategoryHubProps){
        this.id = id
        this.animeId = animeId
        this.categoryId = categoryId
        this.isActive =  isActive        
        this.updatedAt = updatedAt        
        this.createdAt = createdAt
    }

}