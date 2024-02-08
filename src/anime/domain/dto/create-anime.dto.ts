
export interface CreateAnimeDtoProps{
    name: string,
    description: string,
    uniqueName: string,
    stateId: string,
    typeId: string,
    nextEpisode?: Date,
    releaseDate?: Date,
    isActive ?: boolean,
}

export class CreateAnimeDto{
    public readonly name: string
    public readonly description: string
    public readonly uniqueName: string
    public readonly stateId: string
    public readonly typeId: string
    public readonly nextEpisode?: Date
    public readonly releaseDate?: Date
    public readonly isActive ?: boolean

    constructor({ 
                name,
                description,
                uniqueName,
                stateId,
                typeId,
                nextEpisode,
                releaseDate,
                isActive = true, }: CreateAnimeDtoProps){
        this.name = name
        this.description = description
        this.uniqueName = uniqueName
        this.stateId = stateId
        this.typeId = typeId
        this.nextEpisode = nextEpisode
        this.releaseDate = releaseDate
        this.isActive = isActive
    }
    
    static createFromUnknown(props:{[key:string]:any} ): [string?, CreateAnimeDto?] {
        const { 
            name,
            description,
            uniqueName,
            stateId,
            typeId,
            releaseDate = null,
            nextEpisode = null,
            isActive = true } = props
        if( !name ) return [`Name is required`] 
        if( !description ) return [`Description is required`] 
        if( !uniqueName ) return [`UniqueName is required`] 
        if( !stateId ) return [`State anime is required`] 
        if( !typeId ) return [`Type anime is required`] 
        
        return [undefined, new CreateAnimeDto({
            name,
            description,
            uniqueName,
            stateId,
            typeId,
            nextEpisode,
            releaseDate,
            isActive: !!isActive,
            
        })]
    }

}