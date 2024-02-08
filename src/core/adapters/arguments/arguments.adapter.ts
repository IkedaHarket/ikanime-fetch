import { MainArguments } from "../../interfaces";

export abstract class ArgumentsAdapter{
    public getArguments(): MainArguments{ 
        throw new Error('Method is not implemented')
    }
}