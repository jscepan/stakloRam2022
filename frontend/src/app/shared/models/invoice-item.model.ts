import { Type } from 'class-transformer';
import { BaseModel } from './base-model';
import { WorkOrderItemModel } from './work-order-item';

export class InvoiceItemModel extends BaseModel {
  description: string = '';
  uom: string = '';
  quantity: number = 0;
  pricePerUnit: number = 0;
  netPrice: number = 0;
  vatRate: number = 0;
  vatAmount: number = 0;
  grossPrice: number = 0;
  @Type(() => WorkOrderItemModel)
  workOrderItems: WorkOrderItemModel[] = [];
}
