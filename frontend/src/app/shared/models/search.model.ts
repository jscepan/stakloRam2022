export class SearchModel {
  criteriaQuick: string = '';
  private betweenAttributes: BettweenAttribute[] = [];
  ordering: 'ASC' | 'DESC' = 'ASC';

  getBetweenAttributes(): BettweenAttribute[] {
    return this.betweenAttributes;
  }

  addBetweenAttribute(newBetweenAttribute: BettweenAttribute): void {
    let prevAttrIndex = this.betweenAttributes.findIndex(
      (x) => x.attribute === newBetweenAttribute.attribute
    );
    prevAttrIndex < 0
      ? this.betweenAttributes.push(newBetweenAttribute)
      : (this.betweenAttributes[prevAttrIndex] = newBetweenAttribute);
  }

  clearAllBetweenAttributes(): void {
    this.betweenAttributes = [];
  }

  removeBetweenAttribute(attr: string): void {
    let prevAttrIndex = this.betweenAttributes.findIndex(
      (x) => x.attribute === attr
    );
    if (prevAttrIndex >= 0) {
      this.betweenAttributes.splice(prevAttrIndex, 1);
    }
  }
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
