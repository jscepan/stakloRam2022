import { Type } from 'class-transformer';
import { BaseModel } from './base-model';
import { BuyerModel } from './buyer.model';

export class IncomeModel extends BaseModel {
  date: Date = new Date();
  bankStatementNumber: string = '';
  amount: number = 0;
  comment: string = '';
  @Type(() => BuyerModel)
  buyer: BuyerModel = new BuyerModel();
}
