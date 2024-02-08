import { AnimeState } from "../../../../domain/entity";


export abstract class AnimeStateConverter{
    abstract convert(postgresObject: PostgresObject): AnimeState
}

interface PostgresObject{
    id: string;
    name: string;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}

export class AnimeStateConverterPostgres implements AnimeStateConverter{

    private postgresObject !: PostgresObject

    public convert(postgresObject: PostgresObject): AnimeState{
        this.postgresObject = postgresObject
        this.verifyPostgresObject()
         const { 
             id,
             name,
             isActive,
             updatedAt,
             createdAt,
          } = this.postgresObject
 
          return new AnimeState({id, name, isActive, updatedAt, createdAt})
     }
 
     private verifyPostgresObject(): true {
         if(!this.postgresObject) throw new Error('Not valid postgres response')
         if(Object.keys(this.postgresObject).length === 0) throw new Error('Object is empty')
         return true
     }

}