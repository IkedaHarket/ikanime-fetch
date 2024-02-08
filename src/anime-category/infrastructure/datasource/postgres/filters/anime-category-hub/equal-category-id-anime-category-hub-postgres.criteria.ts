import { Criteria } from "../../../../../domain/base";

export class CriteriaEqualAnimeCategoryIdAnimeCategoryHubPostgres implements Criteria<{ animeCategoryId: { equals: string } }>{

    constructor(
        private readonly categoryId: string
    ){}

    applyFilter() {
        return{ animeCategoryId: { equals: this.categoryId } };
    }
    
}