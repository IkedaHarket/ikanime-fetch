import { Criteria } from "../../../../../domain/base";

export class CriteriaEqualAnimeIdAnimeCategoryHubPostgres implements Criteria<{ animeId: { equals: string } }>{

    constructor(
        private readonly animeId: string
    ){}

    applyFilter() {
        return{ animeId: { equals: this.animeId } };
    }
    
}