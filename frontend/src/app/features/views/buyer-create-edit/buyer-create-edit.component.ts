import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { EnumValueModel } from 'src/app/shared/enums/enum.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { BuyerWebService } from 'src/app/web-services/buyer.web-service';
import { BUYER_TYPES, GENDER_TYPES } from 'src/app/shared/constants';
import { CityWebService } from 'src/app/web-services/city.web-service';
import { Observable, Subscription } from 'rxjs';
import { CityCreateEditPopupService } from '../city-create-edit-popup/city-create-edit-popup.service';
import { CityModel } from 'src/app/shared/models/city.model';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SearchModel } from 'src/app/shared/models/search.model';
import { BaseModel } from 'src/app/shared/models/base-model';
import { compareByValue } from 'src/app/shared/utils';
import { MatSelectChange } from '@angular/material/select';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { debounceTime } from 'rxjs/operators';

export interface DialogData {
  oid: string;
}

@Component({
  selector: 'app-buyer-create-edit',
  templateUrl: './buyer-create-edit.component.html',
  styleUrls: ['./buyer-create-edit.component.scss'],
  providers: [
    BuyerWebService,
    CityWebService,
    CityCreateEditPopupService,
    ListEntities,
  ],
})
export class BuyerCreateEditComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  formGroup!: UntypedFormGroup;
  buyerOID!: string;
  isEdit: boolean = false;

  buyerTypesOptions: EnumValueModel[] = BUYER_TYPES;
  genderTypesOptions: EnumValueModel[] = GENDER_TYPES;

  selectedCity?: CityModel;
  cities?: Observable<CityModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  searchControlCity: UntypedFormControl = new UntypedFormControl();
  compareFn: (f1: BaseModel, f2: BaseModel) => boolean = compareByValue;

  private inputSearchControlCitySubscription!: Subscription;
  @Input() debounceTime: number = 500;

  get genderControl(): AbstractControl | null {
    return this.formGroup.get('gender');
  }
  get pibControl(): AbstractControl | null {
    return this.formGroup.get('pib');
  }
  get maticalNumberControl(): AbstractControl | null {
    return this.formGroup.get('maticalNumber');
  }
  get cityControl(): AbstractControl | null {
    return this.formGroup.get('city');
  }

  constructor(
    private dialogRef: MatDialogRef<BuyerCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private globalService: GlobalService,
    private cityWebService: CityWebService,
    private webService: BuyerWebService,
    private cityCreateEditPopupService: CityCreateEditPopupService,
    private translateService: TranslateService,
    private listEntities: ListEntities<CityModel>,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data.oid;
    this.buyerOID = this.data.oid;

    this.subs.sink = this.listEntities
      .setWebService(this.cityWebService)
      .requestFirstPage();
    this.isEdit ? this.initializeEdit() : this.initializeCreate();

    this.inputSearchControlCitySubscription =
      this.searchControlCity.valueChanges
        .pipe(debounceTime(this.debounceTime))
        .subscribe(() => {
          this.searchHandler(this.searchControlCity.value);
        });
  }

  hasPrivilege(privilege: string): boolean {
    return this.authStoreService.isAllowed(privilege);
  }

  initializeCreate(): void {
    this.formGroup = new UntypedFormGroup({
      type: new UntypedFormControl(this.buyerTypesOptions[0].value, [
        Validators.required,
      ]),
      name: new UntypedFormControl('', [Validators.required]),
      address: new UntypedFormControl('', [Validators.required]),
      addressContact: new UntypedFormControl('', []),
      contactPerson: new UntypedFormControl('', []),
      phoneNumberFix: new UntypedFormControl('', []),
      phoneNumberMobile: new UntypedFormControl('', []),
      email: new UntypedFormControl('', [Validators.email]),
      city: new UntypedFormControl('', [Validators.required]),
      jbkjs: new UntypedFormControl('', []),
      account: new UntypedFormControl('', []),
    });
    this.typeChangeHandler(this.formGroup.get('type')?.value);
  }

  initializeEdit(): void {
    this.subs.sink = this.webService
      .getEntityByOid(this.buyerOID)
      .subscribe((buyer) => {
        if (buyer) {
          this.formGroup = new UntypedFormGroup({
            type: new UntypedFormControl(buyer.type, [Validators.required]),
            name: new UntypedFormControl(buyer.name, [Validators.required]),
            address: new UntypedFormControl(buyer.address, [Validators.required]),
            contactPerson: new UntypedFormControl(buyer.contactPerson, []),
            phoneNumberFix: new UntypedFormControl(buyer.phoneNumberFix, []),
            phoneNumberMobile: new UntypedFormControl(buyer.phoneNumberMobile, []),
            email: new UntypedFormControl(buyer.email, [Validators.email]),
            city: new UntypedFormControl(buyer.city, [Validators.required]),
            jbkjs: new UntypedFormControl(buyer.jbkjs, []),
            account: new UntypedFormControl(buyer.account, []),
          });
          this.selectedCity = buyer.city;
          this.typeChangeHandler(
            this.formGroup.get('type')?.value,
            buyer.maticalNumber,
            buyer.pib,
            buyer.gender
          );
        }
      });
  }

  selectCity(event: MatSelectChange): void {
    if (event && event.value) {
      this.selectedCity = event.value;
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  handleSubmitButton(): void {
    const buyer = this.formGroup.value;
    if (buyer.gender === '') {
      buyer.gender = null;
    }

    if (this.isEdit) {
      this.subs.sink.updateEntity$ = this.webService
        .updateEntity(this.buyerOID, buyer)
        .subscribe((buyer) => {
          if (buyer) {
            this.globalService.showBasicAlert(
              MODE.success,
              this.translateService.instant('successfully'),
              this.translateService.instant('buyerIsSuccessfullyUpdated')
            );
            this.dialogRef.close(buyer);
          }
        });
    } else {
      this.subs.sink.createEntity$ = this.webService
        .createEntity(buyer)
        .subscribe((buyer) => {
          if (buyer) {
            this.globalService.showBasicAlert(
              MODE.success,
              this.translateService.instant('successfully'),
              this.translateService.instant('newBuyerIsSuccessfullyCreated')
            );
            this.dialogRef.close(buyer);
          }
        });
    }
  }

  typeChangeHandler(
    type: string,
    maticalNumber: string = '',
    pib: string = '',
    gender: string = ''
  ): void {
    switch (type) {
      case 'COMPANY':
        this.formGroup.addControl(
          'maticalNumber',
          new UntypedFormControl(maticalNumber, [Validators.required])
        );
        this.formGroup.addControl(
          'pib',
          new UntypedFormControl(pib, [Validators.required])
        );

        this.formGroup.removeControl('gender');
        break;
      case 'PERSON':
        this.formGroup.addControl('gender', new UntypedFormControl(gender, []));
        this.formGroup.removeControl('maticalNumber');
        this.formGroup.removeControl('pib');
        break;
    }
  }

  createCity(): void {
    this.cityCreateEditPopupService.openDialog().subscribe((city) => {
      if (city) {
        this.listEntities.requestFirstPage();
      }
    });
  }

  bottomReachedHandler(): void {
    this.listEntities.requestNextPage();
  }

  searchHandler(text: any): void {
    let searchFilter: SearchModel = new SearchModel();
    searchFilter.criteriaQuick = text;
    this.listEntities.setFilter(searchFilter);
  }

  ngOnDestroy(): void {
    this.inputSearchControlCitySubscription.unsubscribe();
    this.subs.unsubscribe();
  }
}
