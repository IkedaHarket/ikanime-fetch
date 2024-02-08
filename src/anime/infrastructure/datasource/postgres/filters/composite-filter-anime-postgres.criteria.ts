import { Criteria } from "../../../../domain/base";

interface CompositeFilterAnimePostgresProps {
    criteria: Criteria<any>[];
    logic: 'AND' | 'OR';
}

export class CompositeFilterAnimePostgres implements Criteria<{ [key: string]: any[] }> {

    public readonly criteria: Criteria<any>[]
    public readonly logic : 'AND' | 'OR'

    constructor({ criteria, logic }: CompositeFilterAnimePostgresProps) {
        this.criteria = criteria
        this.logic = logic
    }
  
    applyFilter() {
      const subqueries = this.criteria.map(c => c.applyFilter());
      return {
        [this.logic]: subqueries,
      };
    }
  }