import { Injectable } from '@angular/core';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { DOMAIN_HISTORY } from '../shared/constants';
import { HistoryModel } from '../shared/models/history.model';

@Injectable()
export class HistoryWebService extends EntityBaseWebService<HistoryModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, HistoryModel, DOMAIN_HISTORY);
  }
}
