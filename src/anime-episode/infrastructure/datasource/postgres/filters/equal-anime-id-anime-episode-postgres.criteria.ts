import { Criteria } from "../../../../domain/base";

export class CriteriaEqualAnimeIdAnimeEpisodePostgres implements Criteria<{ animeId: { equals: string } }>{

    constructor(
        private readonly animeId: string
    ){}

    applyFilter() {
        return{ animeId: { equals: this.animeId } };
    }
    
}