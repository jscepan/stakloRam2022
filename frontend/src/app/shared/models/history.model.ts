import { Type } from 'class-transformer';
import { BaseModel } from './base-model';
import { UserModel } from './user.model';

export class HistoryModel extends BaseModel {
  action: string = '';
  objectType: string = '';
  previousValue: string = '';
  newValue: string = '';
  time: Date = new Date();
  @Type(() => UserModel)
  user: UserModel = new UserModel();
}
