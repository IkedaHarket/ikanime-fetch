
interface CreateAnimeCategoryDtoProps{
    name: string
    isActive ?: boolean
}

export class CreateAnimeCategoryDto{

    public readonly name: string
    public readonly isActive ?: boolean

    constructor({ name, isActive = true }: CreateAnimeCategoryDtoProps){
        this.name = name.toUpperCase()
        this.isActive = isActive
    }

    static createFromUnknown(props:{[key:string]:any}): [string?, CreateAnimeCategoryDto?] {
        const { name, isActive = true } = props
        if( !name ) return [`Name is required`] 
        
        return [undefined, new CreateAnimeCategoryDto({name, isActive: !!isActive})]
    }

}