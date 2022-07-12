import { Injectable } from '@angular/core';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { DOMAIN_TASKS } from '../shared/constants';
import { TaskModel } from '../shared/models/task.model';

@Injectable()
export class TaskWebService extends EntityBaseWebService<TaskModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, TaskModel, DOMAIN_TASKS);
  }
}
