import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SERVICE_STATUSES, SERVICE_TYPES } from 'src/app/shared/constants';
import { EnumValueModel } from 'src/app/shared/enums/enum.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { BuyerWebService } from 'src/app/web-services/buyer.web-service';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { UserWebService } from 'src/app/web-services/user.web-service';
import { Observable } from 'rxjs';
import {
  AppSettings,
  SettingsStoreService,
} from 'src/app/shared/services/settings-store.service';
import { compareByValue, getServiceNumber } from 'src/app/shared/utils';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { UserModel } from 'src/app/shared/models/user.model';
import { BuyerModel } from 'src/app/shared/models/buyer.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { BaseModel } from 'src/app/shared/models/base-model';
import { MatSelectChange } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { ServiceWebService } from 'src/app/web-services/service.web-service';
import { ServiceModel } from 'src/app/shared/models/service.model';

export interface DialogData {
  serviceType?: 'CASE' | 'TASK' | 'SUBTASK';
  parent?: ServiceModel;
}

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.scss'],
  providers: [ServiceWebService, BuyerWebService, UserWebService],
})
export class ServiceCreateComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  formGroup!: FormGroup;
  statusOptions: EnumValueModel[] = SERVICE_STATUSES;
  selectedServiceType: EnumValueModel;

  serviceTypes: EnumValueModel[] = SERVICE_TYPES;
  parent?: ServiceModel;

  getServiceNumber = getServiceNumber;
  settings?: AppSettings;

  listEntitiesBuyers: ListEntities<BuyerModel> = new ListEntities<BuyerModel>();
  buyerEntities?: Observable<BuyerModel[]> = this.listEntitiesBuyers.entities;
  isLoadingBuyers?: Observable<boolean> = this.listEntitiesBuyers.isLoading;
  selectedBuyer?: BuyerModel;
  searchControlBuyers: FormControl = new FormControl();

  listEntitiesUsers: ListEntities<UserModel> = new ListEntities<UserModel>();
  userEntities?: Observable<UserModel[]> = this.listEntitiesUsers.entities;
  isLoadingUsers?: Observable<boolean> = this.listEntitiesUsers.isLoading;
  selectedUser: UserModel | null = null;
  searchControlUsers: FormControl = new FormControl();
  compareFn: (f1: BaseModel, f2: BaseModel) => boolean = compareByValue;

  get buyerControl(): AbstractControl | null {
    return this.formGroup.get('buyer');
  }

  get taskOidControl(): AbstractControl | null {
    return this.formGroup.get('taskOid');
  }

  get caseOidControl(): AbstractControl | null {
    return this.formGroup.get('caseOid');
  }

  get typeControl(): AbstractControl | null {
    return this.formGroup.get('type');
  }

  get parentOidControl(): AbstractControl | null {
    return this.formGroup.get('parentOid');
  }

  constructor(
    private dialogRef: MatDialogRef<ServiceCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private globalService: GlobalService,
    private webService: ServiceWebService,
    private buyerWebService: BuyerWebService,
    private userWebService: UserWebService,
    private authStoreService: AuthStoreService,
    private translateService: TranslateService,
    private settingsStoreService: SettingsStoreService
  ) {
    this.selectedServiceType =
      this.serviceTypes.find((t) => t.value === data.serviceType) ||
      this.serviceTypes[0];
    this.parent = data.parent;
    if (this.parent?.buyer) {
      this.selectedBuyer = this.parent.buyer;
    }
  }

  ngOnInit(): void {
    this.subs.sink = this.listEntitiesBuyers
      .setWebService(this.buyerWebService)
      .requestFirstPage();

    let userSearchFilter = new SearchModel();
    userSearchFilter.attributes = [{ enabled: ['true'] }];
    this.listEntitiesUsers.setFilter(userSearchFilter);
    this.subs.sink = this.listEntitiesUsers
      .setWebService(this.userWebService)
      .requestFirstPage();

    this.subs.sink = this.settingsStoreService.dataLoaded$.subscribe(
      (dataLoaded) => {
        if (dataLoaded) {
          this.settings = this.settingsStoreService.getSettings();
          this.formGroup = this.createServiceForm();
        }
      }
    );

    /*
    this.subs.sink = this.listEntitiesBuyers
      .setWebService(this.buyerWebService)
      .requestFirstPage();

    let userSearchFilter = new SearchModel();
    userSearchFilter.attributes = [{ enabled: ['true'] }];
    this.listEntitiesUsers.setFilter(userSearchFilter);
    this.subs.sink = this.listEntitiesUsers
      .setWebService(this.userWebService)
      .requestFirstPage();

    this.subs.sink = this.settingsStoreService.dataLoaded$.subscribe(
      (dataLoaded) => {
        if (dataLoaded) {
          this.settings = this.settingsStoreService.getSettings();
          this.initializeCreate();
        }
      }
    );
    */
  }

  createServiceForm(): FormGroup {
    const form: FormGroup = new FormGroup({
      type: new FormControl(this.selectedServiceType.value, [
        Validators.required,
      ]),
      dateOfCreate: new FormControl(new Date().toISOString().substring(0, 10)),
      status: new FormControl(this.statusOptions[0].value, [
        Validators.required,
      ]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      buyer: new FormControl(this.parent?.buyer || '', [Validators.required]),
      currentUser: new FormControl(this.authStoreService.user, [
        Validators.required,
      ]),
      parentOid: new FormControl(this.parent?.oid || '', Validators.required),
    });
    if (!this.parent?.oid) {
      form.removeControl('parentOid');
    }
    return form;
  }

  setServiceType(type: string): void {
    this.selectedServiceType =
      this.serviceTypes.find((t) => t.value === type) || this.serviceTypes[0];
    switch (type) {
      case 'TASK':
        this.formGroup.removeControl('parentOid');
        break;
      case 'SUBTASK':
        this.formGroup.removeControl('parentOid');
        break;
      default:
        this.formGroup.removeControl('parentOid');
    }
  }

  handleSubmitButton(): void {
    this.webService.createEntity(this.formGroup.value).subscribe((service) => {
      if (service) {
        this.globalService.showBasicAlert(
          MODE.success,
          this.translateService.instant('successfully'),
          this.translateService.instant('successfullyCreated')
        );
        this.dialogRef.close();
      }
    });
  }

  cancel(): void {
    console.log(this.formGroup);
    this.dialogRef.close();
  }

  searchHandlerBuyers(text: string): void {
    let searchFilter: SearchModel = new SearchModel();
    searchFilter.criteriaQuick = text;
    this.listEntitiesBuyers.setFilter(searchFilter);
  }

  selectBuyer(event: MatSelectChange): void {
    if (event && event.value) {
      this.selectedBuyer = event.value;
    }
  }

  bottomReachedHandlerBuyers(): void {
    this.listEntitiesBuyers.requestNextPage();
  }

  searchHandlerUsers(text: string): void {
    let searchFilter: SearchModel = new SearchModel();
    searchFilter.criteriaQuick = text;
    this.listEntitiesUsers.setFilter(searchFilter);
  }

  selectUser(event: MatSelectChange): void {
    if (event && event.value) {
      this.selectedBuyer = event.value;
    }
  }

  bottomReachedHandlerUsers(): void {
    this.listEntitiesUsers.requestNextPage();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
