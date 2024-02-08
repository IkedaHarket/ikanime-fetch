
interface CreateAnimeCategoryHubDtoProps{
    categoryId: string
    animeId: string
    isActive ?: boolean
}

export class CreateAnimeCategoryHubDto{

    public readonly categoryId: string
    public readonly animeId: string
    public readonly isActive ?: boolean

    constructor({ animeId, categoryId, isActive = true }: CreateAnimeCategoryHubDtoProps){
        this.animeId = animeId
        this.categoryId = categoryId
        this.isActive = isActive
    }

    static createFromUnknown(props:{[key:string]:any}): [string?, CreateAnimeCategoryHubDto?] {
        const { animeId, categoryId, isActive = true } = props
        if( !animeId ) return [`animeId is required`] 
        if( !categoryId ) return [`categoryId is required`] 
        
        return [undefined, new CreateAnimeCategoryHubDto({categoryId, animeId, isActive: !!isActive})]
    }

}