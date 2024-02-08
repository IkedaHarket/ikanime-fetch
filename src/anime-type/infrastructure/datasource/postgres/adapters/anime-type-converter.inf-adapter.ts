import { AnimeType } from "../../../../domain/entity";


export abstract class AnimeTypeConverter{
    abstract convert(postgresObject: PostgresObject): AnimeType
}

interface PostgresObject{
    id: string;
    name: string;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}

export class AnimeTypeConverterPostgres implements AnimeTypeConverter{

    private postgresObject !: PostgresObject

    public convert(postgresObject: PostgresObject): AnimeType{
        this.postgresObject = postgresObject
        this.verifyPostgresObject()
         const { 
             id,
             name,
             isActive,
             updatedAt,
             createdAt,
          } = this.postgresObject
 
          return new AnimeType({id, name, isActive, updatedAt, createdAt})
     }
 
     private verifyPostgresObject(): true{
         if(!this.postgresObject) throw new Error('Not valid postgres response')
         if(Object.keys(this.postgresObject).length === 0) throw new Error('Object is empty')
         return true
     }

}