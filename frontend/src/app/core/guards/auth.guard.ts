import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserModel } from 'src/app/shared/models/user.model';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UserWebService } from 'src/app/web-services/user.web-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  redirectToNotAuthorizedPage = 'auth';

  constructor(
    private authStoreService: AuthStoreService,
    private userWebService: UserWebService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authStoreService.user && this.localStorageService.get('jwt')) {
      return true;
    } else {
      if (!this.authStoreService.canceledURL) {
        this.authStoreService.canceledURL = state.url;
      }
      return this.userWebService.getUserProfile().pipe(
        map((response: UserModel) => {
          if (response) {
            this.authStoreService.user = response ? response : null;
            return true;
          }
          this.router.navigate([this.redirectToNotAuthorizedPage]);
          return false;
        }),
        catchError(() => {
          // Set canceled URL
          this.authStoreService.canceledURL = state.url;
          this.router.navigate([this.redirectToNotAuthorizedPage]);
          return of(false);
        })
      );
    }
  }
}
