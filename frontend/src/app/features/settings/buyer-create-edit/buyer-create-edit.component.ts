import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
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
import { Observable } from 'rxjs';
import { CityCreateEditPopupService } from '../city-create-edit-popup/city-create-edit-popup.service';
import { CityModel } from 'src/app/shared/models/city.model';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SearchModel } from 'src/app/shared/models/search.model';
import { BaseModel } from 'src/app/shared/models/base-model';
import { compareByValue } from 'src/app/shared/utils';
import { MatSelectChange } from '@angular/material/select';

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

  formGroup!: FormGroup;
  buyerOID!: string;
  isEdit: boolean = false;

  buyerTypesOptions: EnumValueModel[] = BUYER_TYPES;
  genderTypesOptions: EnumValueModel[] = GENDER_TYPES;

  selectedCity?: CityModel;
  cities?: Observable<CityModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  searchControlCity: FormControl = new FormControl();
  compareFn: (f1: BaseModel, f2: BaseModel) => boolean = compareByValue;

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
    private listEntities: ListEntities<CityModel>
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data.oid;
    this.buyerOID = this.data.oid;

    this.subs.sink = this.listEntities
      .setWebService(this.cityWebService)
      .requestFirstPage();
    this.isEdit ? this.initializeEdit() : this.initializeCreate();
  }

  initializeCreate(): void {
    this.formGroup = new FormGroup({
      type: new FormControl(this.buyerTypesOptions[0].value, [
        Validators.required,
      ]),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      addressContact: new FormControl('', []),
      contactPerson: new FormControl('', []),
      phoneNumberFix: new FormControl('', []),
      phoneNumberMobile: new FormControl('', []),
      email: new FormControl('', [Validators.email]),
      city: new FormControl('', [Validators.required]),
    });
    this.typeChangeHandler(this.formGroup.get('type')?.value);
  }

  initializeEdit(): void {
    this.subs.sink = this.webService
      .getEntityByOid(this.buyerOID)
      .subscribe((buyer) => {
        if (buyer) {
          this.formGroup = new FormGroup({
            type: new FormControl(buyer.type, [Validators.required]),
            name: new FormControl(buyer.name, [Validators.required]),
            address: new FormControl(buyer.address, [Validators.required]),
            contactPerson: new FormControl(buyer.contactPerson, []),
            phoneNumberFix: new FormControl(buyer.phoneNumberFix, []),
            phoneNumberMobile: new FormControl(buyer.phoneNumberMobile, []),
            email: new FormControl(buyer.email, [Validators.email]),
            city: new FormControl(buyer.city, [Validators.required]),
            jbkjs: new FormControl(buyer.jbkjs, []),
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
          new FormControl(maticalNumber, [Validators.required])
        );
        this.formGroup.addControl(
          'pib',
          new FormControl(pib, [Validators.required])
        );

        this.formGroup.removeControl('gender');
        break;
      case 'PERSON':
        this.formGroup.addControl('gender', new FormControl(gender, []));
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
    this.subs.unsubscribe();
  }
}
