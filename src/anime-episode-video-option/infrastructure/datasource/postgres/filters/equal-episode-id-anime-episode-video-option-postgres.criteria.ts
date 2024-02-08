import { Criteria } from "../../../../domain/base";

export class CriteriaEqualEpidoseIdAnimeEpisodeVideoOptionPostgres implements Criteria<{ animeEpisodeId: { equals: string } }>{

    constructor(
        private readonly episodeId: string
    ){}

    applyFilter() {
        return{ animeEpisodeId: { equals: this.episodeId } };
    }
    
}