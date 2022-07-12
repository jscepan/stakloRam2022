import { Injectable } from '@angular/core';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { DOMAIN_SUBTASKS } from '../shared/constants';
import { SubtaskModel } from '../shared/models/subtask.model';

@Injectable()
export class SubtaskWebService extends EntityBaseWebService<SubtaskModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, SubtaskModel, DOMAIN_SUBTASKS);
  }
}
