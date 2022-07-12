import { Type } from 'class-transformer';
import { BuyerModel } from './buyer.model';
import { ServiceModel } from './service.model';

export class TaskModel extends ServiceModel {
  caseOid: string = '';
  @Type(() => BuyerModel)
  buyer: BuyerModel = new BuyerModel();
  invoiceItemOid?: string;
  subtasks: TaskModel[] = [];
}
