import { Injectable } from '@angular/core';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { DOMAIN_CITY } from '../shared/constants';
import { CityModel } from '../shared/models/city.model';

@Injectable()
export class CityWebService extends EntityBaseWebService<CityModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, CityModel, DOMAIN_CITY);
  }
}
