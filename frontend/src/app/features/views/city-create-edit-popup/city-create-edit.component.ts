import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { BaseModel } from 'src/app/shared/models/base-model';
import { CountryModel } from 'src/app/shared/models/country.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { compareByValue } from 'src/app/shared/utils';
import { CityWebService } from 'src/app/web-services/city.web-service';
import { CountryWebService } from 'src/app/web-services/country.web-service';
import { CountryCreateEditPopupService } from '../country-create-edit/country-create-edit-popup.service';

export interface DialogData {
  oid: string;
}

@Component({
  selector: 'app-city-create-edit',
  templateUrl: './city-create-edit.component.html',
  styleUrls: ['./city-create-edit.component.scss'],
  providers: [
    CityWebService,
    CountryWebService,
    CountryCreateEditPopupService,
    ListEntities,
  ],
})
export class CityCreateEditComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  formGroup!: FormGroup;
  cityOID!: string;
  isEdit: boolean = false;

  countries?: Observable<CountryModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  compareFn: (f1: BaseModel, f2: BaseModel) => boolean = compareByValue;
  selectedCountry?: CountryModel;
  searchControl: FormControl = new FormControl();

  get countryControl(): AbstractControl | null {
    return this.formGroup.get('country');
  }

  constructor(
    private dialogRef: MatDialogRef<CityCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private globalService: GlobalService,
    private countryCreateEditPopupService: CountryCreateEditPopupService,
    private webService: CityWebService,
    private countryWebService: CountryWebService,
    private translateService: TranslateService,
    private listEntities: ListEntities<CountryModel>,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data.oid;
    this.cityOID = this.data.oid;

    this.subs.sink = this.listEntities
      .setWebService(this.countryWebService)
      .requestFirstPage();

    this.isEdit ? this.initializeEdit() : this.initializeCreate();
  }

  hasPrivilege(privilege: string): boolean {
    return this.authStoreService.isAllowed(privilege);
  }

  initializeCreate(): void {
    this.formGroup = new FormGroup({
      zipCode: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    });
  }

  initializeEdit(): void {
    this.webService.getEntityByOid(this.cityOID).subscribe((city) => {
      if (city) {
        this.selectedCountry = city.country;
        this.formGroup = new FormGroup({
          zipCode: new FormControl(city.zipCode, [Validators.required]),
          name: new FormControl(city.name, [Validators.required]),
          country: new FormControl(this.selectedCountry, [Validators.required]),
        });
      }
    });
  }

  selectCountry(event: MatSelectChange): void {
    if (event && event.value) {
      this.selectedCountry = event.value;
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  handleSubmitButton(): void {
    const city = this.formGroup.value;

    if (this.isEdit) {
      this.webService.updateEntity(this.cityOID, city).subscribe((city) => {
        if (city) {
          this.globalService.showBasicAlert(
            MODE.success,
            this.translateService.instant('successfully'),
            this.translateService.instant('cityIsSuccessfullyUpdated')
          );
          this.dialogRef.close(city);
        }
      });
    } else {
      this.webService.createEntity(city).subscribe((city) => {
        if (city) {
          this.globalService.showBasicAlert(
            MODE.success,
            this.translateService.instant('successfully'),
            this.translateService.instant('newCityIsSuccessfullyCreated')
          );
          this.dialogRef.close(city);
        }
      });
    }
  }

  createCountry(): void {
    this.countryCreateEditPopupService.openDialog().subscribe((country) => {
      if (country) {
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
