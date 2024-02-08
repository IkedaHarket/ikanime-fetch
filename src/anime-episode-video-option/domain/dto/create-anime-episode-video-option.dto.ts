
interface CreateAnimeEpisodeVideoOptionDtoProps{
    episodeId: string
    url: string
    nameServer: string
    isActive ?: boolean
}

export class CreateAnimeEpisodeVideoOptionDto{
    
    public readonly episodeId: string
    public readonly url: string
    public readonly nameServer: string
    public readonly isActive ?: boolean

    constructor({ episodeId, nameServer, url, isActive = true }: CreateAnimeEpisodeVideoOptionDtoProps){
        this.episodeId = episodeId
        this.url = url
        this.nameServer = nameServer
        this.isActive = isActive
    }

    static createFromUnknown(props:{[key:string]:any}): [string?, CreateAnimeEpisodeVideoOptionDto?] {
        const { name, episodeId, nameServer, url, isActive = true } = props
        if( !name ) return [`Name is required`] 
        if( !episodeId ) return [`Episode is required`] 
        if( !url ) return [`Url is required`] 
        
        return [
          undefined,
          new CreateAnimeEpisodeVideoOptionDto({
            episodeId,
            nameServer,
            url,
            isActive: !!isActive,
          }),
        ];
    }

}