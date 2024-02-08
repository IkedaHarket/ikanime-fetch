
import { FullTraverseFactory, Traverse, TraverseType } from "./traverse-types";
import { ArgumentsAdapter, YargsAdapter } from "./core";


const FIRST_PAGE = 1 ;

export class Main{

    constructor( 
        private readonly args: ArgumentsAdapter
     ){}
    
    public async main(){
        const { traverse } = this.args.getArguments()

        const handlerTraverse = this.getHandlerTraverse(traverse)

        await handlerTraverse.execute()
        
        return
    }

    

    private getHandlerTraverse(traverse: TraverseType): Traverse {
        switch(traverse){
            case TraverseType.FULL:
                return new FullTraverseFactory(FIRST_PAGE).createTraverse()
                
            default: throw new Error('Traverse not valid')
        } 
    }
}


(async()=> {
    await new Main( new YargsAdapter() ).main()
    console.log('Fin ejecucion')
})()
