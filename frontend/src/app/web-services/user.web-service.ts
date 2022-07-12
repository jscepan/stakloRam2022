import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { BASE_API_URL, DOMAIN_USERS } from '../shared/constants';
import { UserModel } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserWebService extends EntityBaseWebService<UserModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, UserModel, DOMAIN_USERS);
  }

  getUserProfile(): Observable<UserModel> {
    return this.baseWebService.getRequest<UserModel>(
      `${BASE_API_URL + '/' + this.domainName}/profile`,
      this.ModelFromType
    );
  }

  updateUserProfile(entityOID: string, data: UserModel): Observable<UserModel> {
    return this.baseWebService.putRequest<UserModel, UserModel>(
      `${BASE_API_URL + '/' + this.domainName}/profile/${encodeURI(entityOID)}`,
      data,
      this.ModelFromType
    );
  }

  resetUserPassword(userOID: string, newPassword: string): Observable<boolean> {
    return this.baseWebService.postRequest<boolean, string>(
      `${BASE_API_URL + '/' + this.domainName}/profile/${encodeURI(userOID)}`,
      newPassword
    );
  }
}
