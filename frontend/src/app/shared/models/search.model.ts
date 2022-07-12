export class SearchModel {
  criteriaQuick: string = '';
  objectsOIDS: { [key: string]: string[] }[] = [];
  attributes: { [key: string]: string[] }[] = [];
}
