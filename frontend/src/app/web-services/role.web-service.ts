import { Injectable } from '@angular/core';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { DOMAIN_ROLES } from '../shared/constants';
import { RoleModel } from '../shared/models/role.model';

@Injectable()
export class RoleWebService extends EntityBaseWebService<RoleModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, RoleModel, DOMAIN_ROLES);
  }
}
