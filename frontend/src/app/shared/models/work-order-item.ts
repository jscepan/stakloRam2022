import { BaseModel } from './base-model';

export class WorkOrderItemModel extends BaseModel {
  description: string = '';
  uom: string = '';
  dimension1: number = 0;
  dimension2: number = 0;
  dimension3: number = 0;
  quantity: number = 0;
  sumQuantity: number = 0;
  note: number = 0;
  settled: boolean = false;
}
