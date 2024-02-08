import { AnimeCategory } from "../../../../domain/entity";

export abstract class AnimeCategoryConverter{
    abstract convert(postgresObject: PostgresObject): AnimeCategory
}

interface PostgresObject{
    id: string;
    name: string;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}

export class AnimeCategoryConverterPostgres implements AnimeCategoryConverter{

    private postgresObject !: PostgresObject

    public convert(postgresObject: PostgresObject): AnimeCategory{
        this.postgresObject = postgresObject
        this.verifyPostgresObject()
         const { 
             id,
             name,
             isActive,
             updatedAt,
             createdAt,
          } = this.postgresObject
 
          return new AnimeCategory({id, name, isActive, updatedAt, createdAt})
     }
 
     private verifyPostgresObject(): true{
         if(!this.postgresObject) throw new Error('Not valid postgres response')
         if(Object.keys(this.postgresObject).length === 0) throw new Error('Object is empty')
         return true
     }

}