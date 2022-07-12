import { Type } from 'class-transformer';
import { BaseModel } from './base-model';
import { BuyerModel } from './buyer.model';
import { UserModel } from './user.model';

export class ServiceModel extends BaseModel {
  type: string = 'CASE';
  number: number = 0;
  dateOfCreate: Date = new Date();
  status: string = '';
  title: string = '';
  description: string = '';
  parentOid?: string;
  @Type(() => BuyerModel)
  buyer: BuyerModel = new BuyerModel();
  @Type(() => UserModel)
  currentUser: UserModel = new UserModel();
  descedants: ServiceModel[] = [];
  invoiceItemOid?: string;
}
