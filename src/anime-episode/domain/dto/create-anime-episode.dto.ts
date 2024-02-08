interface CreateAnimeEpisodeDtoProps {
    animeId : string
    number : number
    isActive?: boolean
}

export class CreateAnimeEpisodeDto{
    
    public readonly animeId : string
    public readonly number: number
    public readonly isActive ?: boolean

    constructor({ animeId, number, isActive }: CreateAnimeEpisodeDtoProps){
        this.animeId = animeId
        this.number = number
        this.isActive = isActive
    }

    static createFromUnknown(props:{[key:string]:any}): [string?, CreateAnimeEpisodeDto?] {
        const { name, animeId, number, isActive = true } = props
        if( !name ) return [`Name is required`] 
        if( !animeId ) return [`Anime is required`] 
        if( !number ) return [`Episode number is required`] 
        
        return [undefined, new CreateAnimeEpisodeDto({animeId, number, isActive: !!isActive})]
    }

}