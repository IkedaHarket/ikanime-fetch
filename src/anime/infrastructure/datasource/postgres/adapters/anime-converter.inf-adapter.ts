import { Anime } from "../../../../domain/entity";


export abstract class AnimeConverter{
    abstract convert(postgresObject: PostgresObject): Anime
}

interface PostgresObject{
    id: string;
    description: string;
    name: string;
    nextEpisode: Date | null;
    releaseDate: Date | null;
    stateId: string;
    typeId: string;
    uniqueName: string;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}

export class AnimeConverterPostgres implements AnimeConverter{

    private postgresObject !: PostgresObject

    public convert(postgresObject: PostgresObject): Anime{
        this.postgresObject = postgresObject
        this.verifyPostgresObject()
         const { 
            id,
            description,
            name,
            nextEpisode,
            releaseDate,
            stateId,
            typeId,
            uniqueName,
            isActive,
            updatedAt,
            createdAt,
          } = this.postgresObject
 
          return new Anime({id,
            description,
            name,
            nextEpisode,
            releaseDate,
            stateId,
            typeId,
            uniqueName,
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