import { Injectable } from '@angular/core';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { DOMAIN_BUYERS } from '../shared/constants';
import { BuyerModel } from '../shared/models/buyer.model';

@Injectable()
export class BuyerWebService extends EntityBaseWebService<BuyerModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, BuyerModel, DOMAIN_BUYERS);
  }
}
