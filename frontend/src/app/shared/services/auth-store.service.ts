import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private readonly _user = new BehaviorSubject<UserModel | null>(null);
  readonly user$ = this._user.asObservable();

  private readonly _canceledURL = new BehaviorSubject<string | null>('');
  readonly canceledURL$ = this._canceledURL.asObservable();

  constructor() {}

  get canceledURL(): string | null {
    return this._canceledURL.getValue();
  }

  set canceledURL(URL: string | null) {
    this._canceledURL.next(URL);
  }

  get user(): UserModel | null {
    return this._user.getValue();
  }

  set user(data: UserModel | null) {
    this._user.next(data);
  }

  isAllowed(action: string): boolean {
    let isAllowed = false;
    this.user?.roles.forEach((role) => {
      if (role.privileges.includes(action)) {
        isAllowed = true;
      }
    });
    return isAllowed;
  }
}
