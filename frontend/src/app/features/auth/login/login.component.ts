import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthWebService } from '../../../layouts/auth-layout/auth.web-service';
import { TranslateService } from '@ngx-translate/core';
import { ErrorResponseI } from 'src/app/shared/services/error-response.interface';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { AuthRequestModel } from 'src/app/shared/models/auth-request.model';
import { AuthModel } from 'src/app/shared/models/auth.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;
  username: string = '';
  password: string = '';

  constructor(
    private authStoreService: AuthStoreService,
    private authWebService: AuthWebService,
    private router: Router,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  performLogin(): void {
    const loginData: AuthRequestModel = {
      username: this.username.trim(),
      password: encodeURIComponent(this.password),
    };

    this.authWebService.login(loginData).subscribe(
      (data: AuthModel) => {
        if (data) {
          this.localStorageService.set('jwt', `Bearer ${data.jwt}`);
          this.authWebService
            .getCurrentUser()
            .subscribe((response: UserModel) => {
              this.authStoreService.user = response;
              this.router.navigate(['/']);

              if (this.authStoreService.canceledURL) {
                this.router.navigate([
                  decodeURI(this.authStoreService.canceledURL),
                ]);
                this.authStoreService.canceledURL = null;
              }
            });
        }
      },
      (error: ErrorResponseI) => {
        this.globalService.showBasicAlertDefaultError({
          ...error,
          error: {
            ...error.error,
            message: this.translateService.instant('loginFailed'),
            timestamp: new Date(),
          },
        });
      }
    );
  }
}
