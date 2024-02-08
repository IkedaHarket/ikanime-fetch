import { Criteria } from "../../../../domain/base";

export class CriteriaEqualNumberAnimeEpisodePostgres implements Criteria<{ number: { equals: number } }>{

    constructor(
        private readonly number: number
    ){}

    applyFilter() {
        return{ number: { equals: this.number } };
    }
    
}