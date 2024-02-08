interface CreateAnotherAnimeNameDtoProps{
    name: string
    animeId: string
    isActive ?: boolean
}

export class CreateAnotherAnimeNameDto{
    public readonly name: string
    public readonly animeId: string
    public readonly isActive ?: boolean

    constructor({ name, animeId, isActive = true}: CreateAnotherAnimeNameDtoProps){
        this.name = name
        this.animeId = animeId
        this.isActive = isActive
    }

    static createFromUnknown(props:{[key:string]:any}): [ string?, CreateAnotherAnimeNameDto? ] {
        const { name, animeId, isActive = true } = props
        if(!name) return [`Name is required`] 
        if(!animeId) return [`Anime is required`] 
        
        return [undefined, new CreateAnotherAnimeNameDto({
            name, animeId, isActive: !!isActive
        })]
    }

}