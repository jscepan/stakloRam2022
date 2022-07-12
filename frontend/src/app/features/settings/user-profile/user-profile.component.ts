import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { UserModel } from 'src/app/shared/models/user.model';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { RoleWebService } from 'src/app/web-services/role.web-service';
import { UserWebService } from 'src/app/web-services/user.web-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserWebService, RoleWebService, ListEntities],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  formGroup!: FormGroup;
  user?: UserModel | null;
  languages = this.languageService.supportedLanguages;

  constructor(
    private globalService: GlobalService,
    private webService: UserWebService,
    private translateService: TranslateService,
    private languageService: LanguageService,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit(): void {
    this.user = this.authStoreService.user;
    this.formGroup = new FormGroup({
      username: new FormControl(this.user?.username || '', [
        Validators.required,
      ]),
      fullName: new FormControl(this.user?.fullName || '', [
        Validators.required,
      ]),
      email: new FormControl(this.user?.email || '', [
        Validators.required,
        Validators.email,
      ]),
      language: new FormControl(this.languages[0], [Validators.required]),
    });
  }

  cancel(): void {}

  handleSubmitButton(): void {
    if (this.user) {
      this.webService
        .updateUserProfile(this.user.oid, this.formGroup.value)
        .subscribe((user) => {
          if (user) {
            this.authStoreService.user = user;
            this.languageService.changeLanguage(user.language);
            this.globalService.showBasicAlert(
              MODE.success,
              this.translateService.instant('success'),
              this.translateService.instant('profileSuccessfullyUpdated')
            );
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
