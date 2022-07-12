import { Injectable } from '@angular/core';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { DOMAIN_SERVICES } from '../shared/constants';
import { ServiceModel } from '../shared/models/service.model';

@Injectable()
export class ServiceWebService extends EntityBaseWebService<ServiceModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, ServiceModel, DOMAIN_SERVICES);
  }
}
