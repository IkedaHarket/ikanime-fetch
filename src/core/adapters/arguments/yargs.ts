import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { ArgumentsAdapter } from './arguments.adapter'
import { TraverseType } from '../../../traverse-types';
import { MainArguments } from '../../interfaces';

export class YargsAdapter implements ArgumentsAdapter{

    public getArguments(): MainArguments{
        const args = yargs(hideBin(process.argv))
        .option('t',{
            alias:'traverse',
            type:'string',
            demandOption:true,
            describe:'Way to execute scrapping'
        })
        .check((argv, options)=>{
            if(this.isNotValidTraverse(argv.t)) throw `Error: traverse option must be ${Object.values(TraverseType).join(', ')}`;
            return true
        })
        .parseSync()

        return {
            traverse: args.t
        } as MainArguments
    }

    private isValidTraverse(traverse:string): traverse is TraverseType {
        return Object.values(TraverseType).includes(traverse as TraverseType)
    }

    private isNotValidTraverse(traverse:string): traverse is TraverseType{
        return !this.isValidTraverse(traverse)
    }
}

