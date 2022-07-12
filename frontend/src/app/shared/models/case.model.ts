import { Type } from 'class-transformer';
import { BuyerModel } from './buyer.model';
import { ServiceModel } from './service.model';
import { TaskModel } from './task.model';

export class CaseModel extends ServiceModel {
  @Type(() => BuyerModel)
  buyer: BuyerModel = new BuyerModel();
  @Type(() => TaskModel)
  tasks: TaskModel[] = [];
}
