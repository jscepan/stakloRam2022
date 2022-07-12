import { Injectable } from '@angular/core';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { DOMAIN_INCOMES } from '../shared/constants';
import { IncomeModel } from '../shared/models/income.model';

@Injectable()
export class IncomeWebService extends EntityBaseWebService<IncomeModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, IncomeModel, DOMAIN_INCOMES);
  }
}
