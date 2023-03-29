import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { GlobalService } from 'src/app/shared/services/global.service';

@Injectable({ providedIn: 'root' })
export class BasePermissionGuard {
  constructor(
    private authStoreService: AuthStoreService,
    private globalService: GlobalService,
    private translateService: TranslateService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.authStoreService.user?.roles &&
      this.authStoreService.isAllowed(route.data.permission)
    ) {
      return true;
    } else {
      this.globalService.showBasicAlert(
        MODE.error,
        this.translateService.instant('accessDenied'),
        this.translateService.instant('youDontHaveAccess')
      );
      return false;
    }
  }
}
