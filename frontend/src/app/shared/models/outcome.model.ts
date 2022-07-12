import { Type } from 'class-transformer';
import { BaseModel } from './base-model';
import { BuyerModel } from './buyer.model';

export class OutcomeModel extends BaseModel {
  date: Date = new Date();
  amount: number = 0;
  comment: string = '';
  @Type(() => BuyerModel)
  buyer: BuyerModel = new BuyerModel();
}
