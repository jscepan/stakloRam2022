import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { GlobalService } from 'src/app/shared/services/global.service';
import {
  AppSettings,
  SettingsStoreService,
} from 'src/app/shared/services/settings-store.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
  providers: [],
})
export class AppSettingsComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private settingsStoreService: SettingsStoreService
  ) {}

  ngOnInit(): void {
    this.settingsStoreService.dataLoaded$.subscribe((isLoaded) => {
      if (isLoaded) {
        this.formGroup = new FormGroup({
          invoiceCountry: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceCountry || '',
            [Validators.required]
          ),
          invoicePlaceOfIssue: new FormControl(
            this.settingsStoreService.getSettings()?.invoicePlaceOfIssue || '',
            [Validators.required]
          ),
          workOrderPlaceOfIssue: new FormControl(
            this.settingsStoreService.getSettings()?.workOrderPlaceOfIssue ||
              '',
            [Validators.required]
          ),
          invoiceCurrency: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceCurrency || '',
            [Validators.required]
          ),
          invoiceFooter: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceFooter || '',
            [Validators.required]
          ),
          invoicePayingCompanyName: new FormControl(
            this.settingsStoreService.getSettings()?.invoicePayingCompanyName ||
              '',
            [Validators.required]
          ),
          invoicePayingCompanyAddress: new FormControl(
            this.settingsStoreService.getSettings()
              ?.invoicePayingCompanyAddress || '',
            [Validators.required]
          ),
          invoicePayingCompanyBankAccount: new FormControl(
            this.settingsStoreService.getSettings()
              ?.invoicePayingCompanyBankAccount || '',
            [Validators.required]
          ),
          invoicePayingCompanyData: new FormControl(
            this.settingsStoreService.getSettings()?.invoicePayingCompanyData ||
              '',
            [Validators.required]
          ),
          invoiceVatRate: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceVatRate || 0,
            [Validators.required]
          ),
          qrCodeIdentCode: new FormControl(
            this.settingsStoreService.getSettings()?.qrCodeIdentCode || '',
            [Validators.required]
          ),
          qrCodeVersion: new FormControl(
            this.settingsStoreService.getSettings()?.qrCodeVersion || '',
            [Validators.required]
          ),
          qrCodeSignSet: new FormControl(
            this.settingsStoreService.getSettings()?.qrCodeSignSet || '',
            [Validators.required]
          ),
          qrCodeAccountNumber: new FormControl(
            this.settingsStoreService.getSettings()?.qrCodeAccountNumber || '',
            [Validators.required]
          ),
          qrCodeCompanyName: new FormControl(
            this.settingsStoreService.getSettings()?.qrCodeCompanyName || '',
            [Validators.required]
          ),
          qrCodeCurrency: new FormControl(
            this.settingsStoreService.getSettings()?.qrCodeCurrency || '',
            [Validators.required]
          ),
          qrCodePayingCodePerson: new FormControl(
            this.settingsStoreService.getSettings()?.qrCodePayingCodePerson ||
              '',
            [Validators.required]
          ),
          qrCodePayingCodeCompany: new FormControl(
            this.settingsStoreService.getSettings()?.qrCodePayingCodeCompany ||
              '',
            [Validators.required]
          ),
          qrCodePayingPurpose: new FormControl(
            this.settingsStoreService.getSettings()?.qrCodePayingPurpose || '',
            [Validators.required]
          ),
          termoizolacGlassMinArea: new FormControl(
            this.settingsStoreService.getSettings()?.termoizolacGlassMinArea ||
              0.2,
            [Validators.required]
          ),
          constructionMeasureCM: new FormControl(
            this.settingsStoreService.getSettings()?.constructionMeasureCM || 3,
            [Validators.required]
          ),
        });
      }
    });
  }

  updateSettings(): void {
    this.subs.sink = this.settingsStoreService
      .updateSettings(this.formGroup.value)
      .subscribe((isUpdated) => {
        if (isUpdated) {
          this.globalService.showBasicAlert(
            MODE.success,
            this.translateService.instant('successfully'),
            this.translateService.instant('settingsSuccessfullyUpdated')
          );
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
