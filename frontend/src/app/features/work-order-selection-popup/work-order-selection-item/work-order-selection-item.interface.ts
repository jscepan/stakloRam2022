export interface WorkOrderSelectionItem {
  oid: string;
  number: string;
  date: Date;
  forPerson: string;
  description: string;
  note: string;
  selected?: boolean;
}
