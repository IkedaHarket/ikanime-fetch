import { AnimeEpisodeVideoOption } from "../../../../domain/entity";


export abstract class AnimeEpisodeVideoOptionConverter{
    abstract convert(postgresObject: PostgresObject): AnimeEpisodeVideoOption
}

interface PostgresObject{
    id: string;
    animeEpisodeId: string;
    nameServer: string;
    url: string;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}

export class AnimeEpisodeVideoOptionConverterPostgres implements AnimeEpisodeVideoOptionConverter{

    private postgresObject !: PostgresObject

    public convert(postgresObject: PostgresObject): AnimeEpisodeVideoOption{
        this.postgresObject = postgresObject
        this.verifyPostgresObject()
         const { 
             id,
             animeEpisodeId,
             nameServer,
             url,
             isActive,
             updatedAt,
             createdAt,
          } = this.postgresObject
 
          return new AnimeEpisodeVideoOption({ 
            id,
            episodeId: animeEpisodeId,
            nameServer,
            url,
            isActive,
            updatedAt,
            createdAt,
         })
     }
 
     private verifyPostgresObject(): true {
         if(!this.postgresObject) throw new Error('Not valid postgres response')
         if(Object.keys(this.postgresObject).length === 0) throw new Error('Object is empty')
         return true
     }

}