import { Injectable } from '@angular/core';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { DOMAIN_OUTCOMES } from '../shared/constants';
import { OutcomeModel } from '../shared/models/outcome.model';

@Injectable()
export class OutcomeWebService extends EntityBaseWebService<OutcomeModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, OutcomeModel, DOMAIN_OUTCOMES);
  }
}
