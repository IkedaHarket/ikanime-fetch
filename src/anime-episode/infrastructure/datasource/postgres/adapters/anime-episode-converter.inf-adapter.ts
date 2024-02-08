import { AnimeEpisode } from "../../../../domain/entity";


export abstract class AnimeEpisodeConverter{
    abstract convert(postgresObject: PostgresObject): AnimeEpisode
}

interface PostgresObject{
    id: string;
    animeId: string;
    number: number;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}

export class AnimeEpisodeConverterPostgres implements AnimeEpisodeConverter{

    private postgresObject !: PostgresObject

    public convert(postgresObject: PostgresObject): AnimeEpisode{
        this.postgresObject = postgresObject
        this.verifyPostgresObject()
         const { 
             id,
             animeId,
             number,
             isActive,
             updatedAt,
             createdAt,
          } = this.postgresObject
 
          return new AnimeEpisode({id, animeId, number,isActive, updatedAt, createdAt})
     }
 
     private verifyPostgresObject(): true{
         if(!this.postgresObject) throw new Error('Not valid postgres response')
         if(Object.keys(this.postgresObject).length === 0) throw new Error('Object is empty')
         return true
     }

}