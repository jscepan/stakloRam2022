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
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { CountryWebService } from 'src/app/web-services/country.web-service';

export interface DialogData {
  oid: string;
}

@Component({
  selector: 'app-country-create-edit',
  templateUrl: './country-create-edit.component.html',
  styleUrls: ['./country-create-edit.component.scss'],
  providers: [CountryWebService],
})
export class CountryCreateEditComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  formGroup!: FormGroup;
  countryOID!: string;
  isEdit: boolean = false;

  get descriptionControl(): AbstractControl | null {
    return this.formGroup.get('description');
  }
  get identificationCodeControl(): AbstractControl | null {
    return this.formGroup.get('identificationCode');
  }

  constructor(
    private dialogRef: MatDialogRef<CountryCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private globalService: GlobalService,
    private webService: CountryWebService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data.oid;
    this.countryOID = this.data.oid;
    this.isEdit ? this.initializeEdit() : this.initializeCreate();
  }

  initializeCreate(): void {
    this.formGroup = new FormGroup({
      description: new FormControl('', [Validators.required]),
      identificationCode: new FormControl('', [Validators.required]),
    });
  }

  initializeEdit(): void {
    this.webService.getEntityByOid(this.countryOID).subscribe((country) => {
      if (country) {
        this.formGroup = new FormGroup({
          description: new FormControl(country.description, [
            Validators.required,
          ]),
          identificationCode: new FormControl(country.identificationCode, [
            Validators.required,
          ]),
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
        .updateEntity(this.countryOID, this.formGroup.value)
        .subscribe((country) => {
          if (country) {
            this.globalService.showBasicAlert(
              MODE.success,
              this.translateService.instant('successfully'),
              this.translateService.instant('countryIsSuccessfullyUpdated')
            );
            this.dialogRef.close(country);
          }
        });
    } else {
      this.webService
        .createEntity(this.formGroup.value)
        .subscribe((country) => {
          if (country) {
            this.globalService.showBasicAlert(
              MODE.success,
              this.translateService.instant('successfully'),
              this.translateService.instant('newCountryIsSuccessfullyCreated')
            );
            this.dialogRef.close(country);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
