export class SearchModel {
  criteriaQuick: string = '';
  attributes: { [key: string]: string[] }[] = [];
  betweenAttributes: BettweenAttribute[] = [];
  ordering: 'ASC' | 'DESC' = 'ASC';
}

export interface BettweenAttribute {
  attribute: string;
  attributeValue: string;
  attributeType: 'NUMBER' | 'DATE' | 'STRING';
  type:
    | 'GREATER'
    | 'SMALLER'
    | 'GREATER_OR_EQUAL'
    | 'SMALLER_OR_EQUAL'
    | 'EQUAL';
}
