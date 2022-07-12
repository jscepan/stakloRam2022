import { Injectable } from '@angular/core';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { DOMAIN_IMAGES } from '../shared/constants';
import { ImageModel } from '../shared/models/image.model';

@Injectable()
export class ImageWebService extends EntityBaseWebService<ImageModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, ImageModel, DOMAIN_IMAGES);
  }
}
