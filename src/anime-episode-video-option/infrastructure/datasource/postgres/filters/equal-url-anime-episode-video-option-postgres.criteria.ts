import { Criteria } from "../../../../domain/base";

export class CriteriaEqualUrlAnimeEpisodeVideoOptionPostgres implements Criteria<{ url: { equals: string } }>{

    constructor(
        private readonly url: string
    ){}

    applyFilter() {
        return{ url: { equals: this.url } };
    }
    
}