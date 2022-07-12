import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyerCreateEditPopupService } from '@features/settings/buyer-create-edit/buyer-create-edit-popup.service';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { SERVICE_STATUSES } from 'src/app/shared/constants';
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
import { ServiceWebService } from 'src/app/web-services/service.web-service';
import { ServiceModel } from 'src/app/shared/models/service.model';
import { ServiceCreatePopupService } from '@features/service-create-popup/service-create-popup.service';

export interface ServiceBreadcrumbItem {
  oid: string;
  displayName: string;
  isLink: boolean;
  type: string;
  url?: string;
}

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss'],
  providers: [
    ServiceWebService,
    BuyerCreateEditPopupService,
    BuyerWebService,
    UserWebService,
    ServiceCreatePopupService,
  ],
})
export class ServiceEditComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  @Output() eventOccurs: EventEmitter<{ eventName: string; payload?: string }> =
    new EventEmitter();

  serviceOID: string | null = null;
  service!: ServiceModel;
  formGroup!: FormGroup;
  statusOptions: EnumValueModel[] = SERVICE_STATUSES;
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

  getServiceNumber = getServiceNumber;

  breadrumbs: ServiceBreadcrumbItem[] = [];

  get buyerControl(): AbstractControl | null {
    return this.formGroup.get('buyer');
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private webService: ServiceWebService,
    private buyerWebService: BuyerWebService,
    private userWebService: UserWebService,
    private buyerCreateEditPopupService: BuyerCreateEditPopupService,
    private authStoreService: AuthStoreService,
    private settingsStoreService: SettingsStoreService,
    private translateService: TranslateService,
    private serviceCreatePopupService: ServiceCreatePopupService
  ) {}

  ngOnInit(): void {
    this.serviceOID = this.route.snapshot.paramMap.get('serviceOID');
    this.subs.sink = this.route.params.subscribe((params) => {
      if (params.serviceOID) {
        this.serviceOID = params.serviceOID;
        this.initializeEdit();
      }
    });

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
          this.initializeEdit();
        }
      }
    );
  }

  initializeEdit(): void {
    if (this.serviceOID) {
      this.webService.getEntityByOid(this.serviceOID).subscribe((service) => {
        this.service = service;
        if (service) {
          this.selectedBuyer = service.buyer;
          this.selectedUser = service.currentUser;
          this.formGroup = new FormGroup({
            number: new FormControl(service.number, [Validators.required]),
            dateOfCreate: new FormControl(service.dateOfCreate, [
              Validators.required,
            ]),
            status: new FormControl(service.status, [Validators.required]),
            title: new FormControl(service.title, [Validators.required]),
            description: new FormControl(service.description, []),
            buyer: new FormControl(this.selectedBuyer, [Validators.required]),
            currentUser: new FormControl(this.selectedUser, [
              Validators.required,
            ]),
          });
          this.setBreadcrumbForService();
        }
      });
    }
  }

  selectBuyer(event: MatSelectChange): void {
    if (event && event.value) {
      this.selectedBuyer = event.value;
    }
  }

  selectUser(event: MatSelectChange): void {
    if (event && event.value) {
      this.selectedBuyer = event.value;
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  handleSubmitButton(): void {
    if (this.serviceOID) {
      this.webService
        .updateEntity(this.serviceOID, this.formGroup.value)
        .subscribe((service) => {
          if (service) {
            this.globalService.showBasicAlert(
              MODE.success,
              this.translateService.instant('successfully'),
              this.translateService.instant('successfullyUpdated')
            );
            this.router.navigate(['services', 'edit', service.oid]);
          }
        });
    }
  }

  createBuyer(): void {
    this.buyerCreateEditPopupService.openDialog().subscribe((buyer) => {
      if (buyer) {
        this.listEntitiesBuyers.requestFirstPage();
        // TODO
      }
    });
  }

  customEvent(eventName: string, payload?: string): void {
    this.eventOccurs.emit({ eventName, payload });
  }

  searchHandlerBuyers(text: string): void {
    let searchFilter: SearchModel = new SearchModel();
    searchFilter.criteriaQuick = text;
    this.listEntitiesBuyers.setFilter(searchFilter);
  }

  searchHandlerUsers(text: string): void {
    let searchFilter: SearchModel = new SearchModel();
    searchFilter.criteriaQuick = text;
    this.listEntitiesUsers.setFilter(searchFilter);
  }

  create(): void {
    this.router.navigate(['services', 'create']);
  }

  bottomReachedHandlerUsers(): void {
    this.listEntitiesUsers.requestNextPage();
  }

  bottomReachedHandlerBuyers(): void {
    this.listEntitiesBuyers.requestNextPage();
  }

  private setBreadcrumbForService(): void {
    this.breadrumbs = [];
    this.breadrumbs.push({
      oid: this.service.oid,
      displayName: this.getServiceNumber(this.service),
      isLink: false,
      type: this.service.type.toLowerCase(),
    });

    if (this.service.parentOid) {
      this.subs.sink.$getFirstParent = this.webService
        .getEntityByOid(this.service.parentOid)
        .subscribe((s) => {
          this.breadrumbs.unshift({
            oid: s.oid,
            displayName: this.getServiceNumber(s),
            isLink: true,
            type: s.type.toLowerCase(),
          });

          if (s.parentOid) {
            this.subs.sink.$getSecondParent = this.webService
              .getEntityByOid(s.parentOid)
              .subscribe((ser) => {
                this.breadrumbs.unshift({
                  oid: ser.oid,
                  displayName: this.getServiceNumber(ser),
                  isLink: true,
                  type: ser.type.toLowerCase(),
                });
              });
          }
        });
    }
  }

  addSubtask(): void {
    if (this.service.type === 'SUBTASK') {
      return;
    }
    const typeToCreate = this.service.type === 'CASE' ? 'TASK' : 'SUBTASK';
    this.subs.sink = this.serviceCreatePopupService
      .openDialog(typeToCreate, this.service)
      .subscribe((service) => {
        if (service) {
          // TODO
        }
      });
  }

  openSubtask(oid: string): void {
    this.router.navigate(['services', 'edit', oid]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
