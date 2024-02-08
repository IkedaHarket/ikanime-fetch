import { AnotherAnimeName } from "../../../../domain/entity";

export abstract class AnotherAnimeNameConverter{
    abstract convert(postgresObject: PostgresObject): AnotherAnimeName
}

interface PostgresObject{
    id: string;
    animeId: string;
    name: string;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}

export class AnotherAnimeNameConverterPostgres implements AnotherAnimeNameConverter{

    private postgresObject !: PostgresObject

    public convert(postgresObject: PostgresObject): AnotherAnimeName{
        this.postgresObject = postgresObject
        this.verifyPostgresObject()
         const { 
             id,
             name,
             isActive,
             animeId,
             updatedAt,
             createdAt,
          } = this.postgresObject
 
          return new AnotherAnimeName({id, name, isActive, animeId, updatedAt, createdAt})
     }
 
     private verifyPostgresObject(): true{
         if(!this.postgresObject) throw new Error('Not valid postgres response')
         if(Object.keys(this.postgresObject).length === 0) throw new Error('Object is empty')
         return true
     }

}