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
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
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
          username: new FormControl(user.username, [Validators.required]),
          fullName: new FormControl(user.fullName, [Validators.required]),
          email: new FormControl(user.email, [Validators.required]),
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
