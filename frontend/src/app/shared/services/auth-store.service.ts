import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PermissionModel } from '../models/permission.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private _isForgotPasswordEmailSent: boolean = false;

  private readonly _user = new BehaviorSubject<UserModel | null>(null);
  readonly user$ = this._user.asObservable();

  private readonly _permissions = new BehaviorSubject<PermissionModel[] | null>(
    null
  );
  readonly permissions$ = this._permissions.asObservable();

  private readonly _language = new BehaviorSubject<string | null>(null);
  readonly language$ = this._language.asObservable();

  private readonly _starredCompaniesBucket = new BehaviorSubject<string | null>(
    null
  );

  private readonly _canceledURL = new BehaviorSubject<string | null>('');
  readonly canceledURL$ = this._canceledURL.asObservable();

  private readonly _importStatusFromBE = new BehaviorSubject<boolean>(true);
  readonly importStatusFromBE$ = this._importStatusFromBE.asObservable();

  constructor() {}

  // // Import data status change
  // set importStatusFromBE(data: boolean) {
  //   this._importStatusFromBE.next(data);
  // }

  get canceledURL(): string | null {
    return this._canceledURL.getValue();
  }

  set canceledURL(URL: string | null) {
    this._canceledURL.next(URL);
  }

  // forgot email
  setIsForgotPasswordEmailSent(value: boolean): void {
    this._isForgotPasswordEmailSent = value;
  }

  getIsForgotPasswordEmailSent(): boolean {
    return this._isForgotPasswordEmailSent;
  }

  // user
  get user(): UserModel | null {
    return this._user.getValue();
  }

  set user(data: UserModel | null) {
    this._user.next(data);
  }

  // permissions
  get permissions(): PermissionModel[] | null {
    return this._permissions.getValue();
  }

  set permissions(data: PermissionModel[] | null) {
    this._permissions.next(data);
  }

  get language(): string | null {
    return this._language.getValue();
  }

  set language(language: string | null) {
    this._language.next(language);
  }

  isAllowed(action: string): boolean {
    const actionSection: string[] = this.parsePermission(action);
    return this.permissions
      ? this.permissions.findIndex((permission) => {
          const permissionSection = this.parsePermission(permission.permission);
          return permissionSection[1] === '*'
            ? actionSection[0] === permissionSection[0]
            : permission.permission === action;
        }) > -1
      : false;
  }

  parsePermission(permission: string): string[] {
    permission = permission || ':';
    const lastIndex: number = permission.lastIndexOf(':');
    return lastIndex !== -1
      ? [
          permission.substring(0, lastIndex),
          permission.substring(lastIndex + 1),
        ]
      : [permission, '*'];
  }
}
