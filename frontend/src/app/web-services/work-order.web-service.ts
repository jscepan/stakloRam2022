import { Injectable } from '@angular/core';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { DOMAIN_WORK_ORDERS } from '../shared/constants';
import { WorkOrderModel } from '../shared/models/work-order';

@Injectable()
export class WorkOrderWebService extends EntityBaseWebService<WorkOrderModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, WorkOrderModel, DOMAIN_WORK_ORDERS);
  }
}