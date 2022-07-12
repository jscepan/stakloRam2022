import { Type } from 'class-transformer';
import { BaseModel } from './base-model';
import { BuyerModel } from './buyer.model';
import { WorkOrderItemModel } from './work-order-item';

export class WorkOrderModel extends BaseModel {
  number: string = '';
  dateOfCreate: Date = new Date();
  placeOfIssue: string = '';
  forPerson: string = '';
  description: string = '';
  note: string = '';
  @Type(() => BuyerModel)
  buyer: BuyerModel = new BuyerModel();
  workOrderItems: WorkOrderItemModel[] = [];
}
