import { Criteria } from "../../../../domain/base";

export class CriteriaEqualUniqueNameAnimePostgres implements Criteria<{ uniqueName: { equals: string } }>{

    constructor(
        private readonly uniqueName: string
    ){}

    applyFilter() {
        return{ uniqueName: { equals: this.uniqueName } };
    }
    
}