import { AnimeCategoryHub } from "../../../../domain/entity";

export abstract class AnimeCategoryHubConverter{
    abstract convert(postgresObject: PostgresObject): AnimeCategoryHub
}

interface PostgresObject{
    id: string;
    animeId: string;
    animeCategoryId: string;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
}

export class AnimeCategoryHubConverterPostgres implements AnimeCategoryHubConverter{

    private postgresObject !: PostgresObject

    public convert(postgresObject: PostgresObject): AnimeCategoryHub{
        this.postgresObject = postgresObject
        this.verifyPostgresObject()
         const { 
             id,
             animeCategoryId: categoryId,
             animeId,
             isActive,
             updatedAt,
             createdAt,
          } = this.postgresObject
 
          return new AnimeCategoryHub({id, categoryId, animeId, isActive, updatedAt, createdAt})
     }
 
     private verifyPostgresObject(): true{
         if(!this.postgresObject) throw new Error('Not valid postgres response')
         if(Object.keys(this.postgresObject).length === 0) throw new Error('Object is empty')
         return true
     }

}