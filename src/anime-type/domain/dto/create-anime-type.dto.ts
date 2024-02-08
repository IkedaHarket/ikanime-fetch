interface CreateAnimeTypeDtoProps {
    name: string
    isActive?: boolean
}

export class CreateAnimeTypeDto{
    
    public readonly name: string
    public readonly isActive ?: boolean

    constructor({ name, isActive = true}: CreateAnimeTypeDtoProps){
        this.name = name.toUpperCase()
        this.isActive = !!isActive
    }

    static createFromUnknown(props:{[key:string]:any}): [string?, CreateAnimeTypeDto?] {
        const { name, isActive = true } = props
        if( !name ) return [`Name is required`] 
        
        return [undefined, new CreateAnimeTypeDto({name, isActive: !!isActive})]
    }

}