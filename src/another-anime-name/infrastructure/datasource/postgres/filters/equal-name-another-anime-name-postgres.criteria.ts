import { Criteria } from "../../../../domain/base";

export class CriteriaEqualNameAnotherAnimeNamePostgres implements Criteria<{ name: { equals: string } }>{

    constructor(
        private readonly name: string
    ){}

    applyFilter() {
        return{ name: { equals: this.name } };
    }
    
}