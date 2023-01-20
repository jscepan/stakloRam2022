import { Type } from 'class-transformer';
import { BaseModel } from './base-model';
import { CityModel } from './city.model';

export class BuyerModel extends BaseModel {
  type?: string;
  name: string = '';
  address: string = '';
  maticalNumber: string = '';
  pib: string = '';
  contactPerson: string = '';
  phoneNumberFix: string = '';
  phoneNumberMobile: string = '';
  email: string = '';
  gender?: string;
  @Type(() => CityModel)
  city?: CityModel;
  jbkjs?: string;
  account?: string;
}
