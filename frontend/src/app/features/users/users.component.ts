import { Component, OnDestroy, OnInit } from '@angular/core';
import { PasswordResetPopupService } from '@features/password-reset/password-reset-popup.service';
import { UserCreateEditPopupService } from '@features/user-create-edit/user-create-edit-popup.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { SearchModel } from 'src/app/shared/models/search.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { UserWebService } from 'src/app/web-services/user.web-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [
    UserCreateEditPopupService,
    PasswordResetPopupService,
    UserWebService,
    ListEntities,
  ],
})
export class UsersComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  entities?: Observable<UserModel[]> = this.listEntities.entities;

  keyword: string = '';

  constructor(
    private userCreateEditPopupService: UserCreateEditPopupService,
    private passwordResetPopupService: PasswordResetPopupService,
    private webService: UserWebService,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private listEntities: ListEntities<UserModel>
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.listEntities
      .setWebService(this.webService)
      .requestFirstPage();
  }

  inputSearchHandler(text: string): void {
    const searchFilter: SearchModel = new SearchModel();
    searchFilter.criteriaQuick = text;
    this.listEntities.setFilter(searchFilter);
  }

  createUser(): void {
    this.userCreateEditPopupService.openDialog().subscribe((user) => {
      if (user) {
        this.listEntities.requestFirstPage();
      }
    });
  }

  editUser(oid: string): void {
    this.userCreateEditPopupService.openDialog(oid).subscribe((user) => {
      if (user) {
        this.listEntities.requestFirstPage();
      }
    });
  }

  resetPassword(oid: string): void {
    this.passwordResetPopupService.openDialog(oid).subscribe((isReset) => {
      if (isReset) {
        this.globalService.showBasicAlert(
          MODE.success,
          this.translateService.instant('successfully'),
          this.translateService.instant('passwordSuccessfullyChanged')
        );
      }
    });
  }

  bottomReachedHandler(): void {
    this.listEntities.requestNextPage();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
