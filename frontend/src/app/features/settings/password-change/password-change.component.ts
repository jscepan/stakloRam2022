import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthWebService } from '@layouts/auth-layout/auth.web-service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { UserModel } from 'src/app/shared/models/user.model';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { RoleWebService } from 'src/app/web-services/role.web-service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
  providers: [AuthWebService, RoleWebService, ListEntities],
})
export class PasswordChangeComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  formGroup!: UntypedFormGroup;
  username: string = '';

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private webService: AuthWebService,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit(): void {
    this.formGroup = new UntypedFormGroup({
      username: new UntypedFormControl(this.authStoreService.user?.username, [
        Validators.required,
      ]),
      oldPassword: new UntypedFormControl('', [Validators.required]),
      newPassword: new UntypedFormControl('', [Validators.required]),
      newPasswordRepeat: new UntypedFormControl('', [Validators.required]),
    });
    // this.formGroup.get('username')?.disable();
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  handleSubmitButton(): void {
    if (
      this.formGroup.get('newPassword')?.value ===
      this.formGroup.get('newPasswordRepeat')?.value
    ) {
      this.webService.changePassword(this.formGroup.value).subscribe((data) => {
        if (data && data.jwt) {
          this.localStorageService.set('jwt', `Bearer ${data.jwt}`);
          this.authStoreService;
          this.globalService.showBasicAlert(
            MODE.success,
            this.translateService.instant('success'),
            this.translateService.instant('passwordSuccessfullyChanged')
          );
        }
      });
    } else {
      this.globalService.showBasicAlert(
        MODE.error,
        this.translateService.instant('error'),
        this.translateService.instant('newPasswordDontMatch')
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
