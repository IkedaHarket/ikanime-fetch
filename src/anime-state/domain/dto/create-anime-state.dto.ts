interface CreateAnimeStateDtoProps {
    name: string
    isActive?: boolean
}

export class CreateAnimeStateDto{
    
    public readonly name: string
    public readonly isActive ?: boolean

    constructor({ name, isActive = true }: CreateAnimeStateDtoProps){
        this.name = name.toUpperCase()
        this.isActive = !!isActive
    }

    static createFromUnknown(props:{[key:string]:any}): [string?, CreateAnimeStateDto?] {
        const { name, isActive = true } = props
        if( !name ) return [`Name is required`] 
        
        return [undefined, new CreateAnimeStateDto({name, isActive: !!isActive})]
    }

}