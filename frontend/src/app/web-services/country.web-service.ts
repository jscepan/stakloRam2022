import { Injectable } from '@angular/core';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { DOMAIN_COUNTRIES } from '../shared/constants';
import { CountryModel } from '../shared/models/country.model';

@Injectable()
export class CountryWebService extends EntityBaseWebService<CountryModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, CountryModel, DOMAIN_COUNTRIES);
  }
}
