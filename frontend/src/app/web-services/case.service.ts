import { Injectable } from '@angular/core';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { DOMAIN_CASES } from '../shared/constants';
import { CaseModel } from '../shared/models/case.model';

@Injectable()
export class CaseWebService extends EntityBaseWebService<CaseModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, CaseModel, DOMAIN_CASES);
  }
}
