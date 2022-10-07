import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { BASE_API_URL, DOMAIN_IMAGES } from '../shared/constants';
import { ImageModel } from '../shared/models/image.model';

@Injectable()
export class ImageWebService extends EntityBaseWebService<ImageModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, ImageModel, DOMAIN_IMAGES);
  }

  public upload(formData: FormData): Observable<string[]> {
    return this.baseWebService.postRequest<string[], FormData>(
      `${BASE_API_URL + '/' + this.domainName}`,
      formData
    );
  }
}
