import { Type } from 'class-transformer';
import { BaseModel } from './base-model';
import { CountryModel } from './country.model';

export class CityModel extends BaseModel {
  zipCode: string = '';
  name: string = '';
  @Type(() => CountryModel)
  country?: CountryModel;
}
