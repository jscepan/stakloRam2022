import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { UserModel } from 'src/app/shared/models/user.model';
import { UserWebService } from 'src/app/web-services/user.web-service';
import { RoleModel } from 'src/app/shared/models/role.model';
import { RoleWebService } from 'src/app/web-services/role.web-service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { Observable } from 'rxjs';
import { BaseModel } from 'src/app/shared/models/base-model';
import { compareByValue } from 'src/app/shared/utils';
import { LanguageService } from 'src/app/language.service';
import { X } from 'angular-feather/icons';
import { PRIVILEGES } from 'src/app/shared/constants';

export interface DialogData {
  oid: string;
}

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss'],
  providers: [UserWebService, RoleWebService, ListEntities],
})
export class UserCreateEditComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  formGroup!: FormGroup;
  user!: UserModel;
  userOID!: string;
  isEdit: boolean = false;

  roles: Observable<RoleModel[]> = this.listEntities.entities;
  compareFn: (f1: BaseModel, f2: BaseModel) => boolean = compareByValue;
  selected?: RoleModel[] = [];

  languages = this.languageService.supportedLanguages;

  privilegesGroupByRoles: {
    roleName: string;
    privileges: string[];
  }[] = [];

  constructor(
    private dialogRef: MatDialogRef<UserCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private globalService: GlobalService,
    private webService: UserWebService,
    private translateService: TranslateService,
    private roleWebService: RoleWebService,
    private languageService: LanguageService,
    private listEntities: ListEntities<RoleModel>
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data.oid;
    this.userOID = this.data.oid;

    this.subs.sink = this.listEntities
      .setWebService(this.roleWebService)
      .requestFirstPage();
    if (this.isEdit) {
      this.subs.sink = this.webService
        .getEntityByOid(this.userOID)
        .subscribe((user) => {
          this.user = user;
          this.initializeEdit();
        });
    } else {
      this.initializeCreate();
    }
  }

  initializeCreate(): void {
    this.formGroup = new FormGroup({
      displayName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', []),
      enabled: new FormControl(true, [Validators.required]),
      roles: new FormControl('', [Validators.required]),
      language: new FormControl(this.languages[0], [Validators.required]),
    });
  }

  initializeEdit(): void {
    this.webService.getEntityByOid(this.userOID).subscribe((user) => {
      if (user) {
        this.selected = user.roles;
        this.formGroup = new FormGroup({
          displayName: new FormControl(user.displayName, [
            Validators.required,
            Validators.minLength(3),
          ]),
          username: new FormControl(user.username, [
            Validators.required,
            Validators.minLength(3),
          ]),
          fullName: new FormControl(user.fullName, [
            Validators.required,
            Validators.minLength(3),
          ]),
          email: new FormControl(user.email, []),
          enabled: new FormControl(user.enabled, [Validators.required]),
          roles: new FormControl(user.roles, [Validators.required]),
          language: new FormControl(user.language, [Validators.required]),
        });
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  handleSubmitButton(): void {
    if (this.isEdit) {
      this.webService
        .updateEntity(this.userOID, this.formGroup.value)
        .subscribe((user) => {
          if (user) {
            this.globalService.showBasicAlert(
              MODE.success,
              this.translateService.instant('successfully'),
              this.translateService.instant('userIsSuccessfullyUpdated')
            );
            this.dialogRef.close(user);
          }
        });
    } else {
      this.webService.createEntity(this.formGroup.value).subscribe((user) => {
        if (user) {
          this.globalService.showBasicAlert(
            MODE.success,
            this.translateService.instant('successfully'),
            this.translateService.instant('newUserIsSuccessfullyCreated')
          );
          this.dialogRef.close(user);
        }
      });
    }
  }

  getTooltipDescriptionForRole(role: RoleModel): Observable<string> {
    const p = this.privilegesGroupByRoles.filter(
      (x) => x.roleName === role.name
    )[0];
    if (p) {
      return new Observable((subscriber) => {
        subscriber.next(this.getMessageForPrivileges(p.privileges));
        subscriber.complete();
      });
    }
    return new Observable((subscriber) => {
      this.subs.sink = this.roles.subscribe((roles: RoleModel[]) => {
        if (roles.length) {
          const r = roles.filter((r) => r.name === role.name);
          if (r) {
            this.privilegesGroupByRoles.push({
              roleName: r[0].name,
              privileges: r[0].privileges,
            });
            subscriber.next(this.getMessageForPrivileges(r[0].privileges));
            subscriber.complete();
          }
        }
      });
    });
  }

  private getMessageForPrivileges(privileges: string[]): string {
    let response = this.translateService.instant('privileges') + ': ' + '\n';
    privileges
      .sort((a, b) => {
        return a.localeCompare(b);
      })
      .forEach((p) => {
        response +=
          this.translateService.instant(
            PRIVILEGES.filter((priv) => priv.value === p)[0]?.displayName
          ) +
          ', ' +
          '\n';
      });
    return response;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
