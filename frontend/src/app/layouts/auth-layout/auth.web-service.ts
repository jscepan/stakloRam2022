import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseWebService } from 'src/app/core/services/base.web-service';
import { BASE_API_URL } from 'src/app/shared/constants';
import { AuthRequestModel } from 'src/app/shared/models/auth-request.model';
import { AuthModel } from 'src/app/shared/models/auth.model';
import { UserModel } from 'src/app/shared/models/user.model';

@Injectable()
export class AuthWebService {
  constructor(private baseWebService: BaseWebService) {}

  login(data: AuthRequestModel): Observable<AuthModel> {
    return this.baseWebService.postRequest<AuthModel, AuthRequestModel>(
      `${BASE_API_URL}/auth/login`,
      data,
      AuthModel
      // LOGIN_FORM_CONTENT_TYPE
    );
  }

  getCurrentUser(): Observable<UserModel> {
    return this.baseWebService.getRequest<UserModel>(
      `${BASE_API_URL}/users/profile`,
      UserModel
    );
  }

  // requestPasswordReset(data: { userID: string }): Observable<void> {
  //   return this.baseWebService.postRequest<void, { userID: string }>(
  //     `${this.constantsFromEnv.MATE_BASE_API_URL}/auth/password-reset`,
  //     data
  //   );
  // }

  // requestPasswordReset(data: {
  //   username: string;
  //   oldPassword: string;
  //   newPassword: string;
  // }): Observable<void> {
  //   return this.baseWebService.postRequest<
  //     void,
  //     { username: string; oldPassword: string; newPassword: string }
  //   >(`${BASE_API_URL}/auth/password-reset`, data);
  // }

  changePassword(data: {
    username: string;
    oldPassword: string;
    newPassword: string;
  }): Observable<{ jwt: string }> {
    return this.baseWebService.postRequest<
      { jwt: string },
      { username: string; oldPassword: string; newPassword: string }
    >(`${BASE_API_URL}/auth/password-change`, data);
  }

  // requestChangePassword(data: { oldPassword: string; newPassword: string }): Observable<void> {
  //   return this.baseWebService.postRequest<void, { oldPassword: string; newPassword: string }>(
  //     `${this.constantsFromEnv.MATE_BASE_API_URL}/auth/password`,
  //     data
  //   );
  // }

  // createAccount(data: AccountModel): Observable<void> {
  //   return this.baseWebService.postRequest<void, AccountModel>(
  //     `${this.constantsFromEnv.MARKETPLACE_BASE_API_URL}/users/user-invite-token`,
  //     data,
  //     AccountModel
  //   );
  // }
}
