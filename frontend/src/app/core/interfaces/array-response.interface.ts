export interface ArrayResponseI<T> {
  entities: Array<T>;
  nextID: number;
  totalCount: number;
}
