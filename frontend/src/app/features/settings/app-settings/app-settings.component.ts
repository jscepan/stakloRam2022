import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
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

  formGroup!: UntypedFormGroup;

  get invoiceForeignNotesFormArr(): UntypedFormArray {
    return this.formGroup.get('invoiceForeignNotes') as UntypedFormArray;
  }

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private settingsStoreService: SettingsStoreService,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit(): void {
    this.settingsStoreService.dataLoaded$.subscribe((isLoaded) => {
      if (isLoaded) {
        this.formGroup = new UntypedFormGroup({
          companyEmail: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.companyEmail || '',
            [Validators.required]
          ),
          companyWebsite: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.companyWebsite || '',
            []
          ),
          invoiceMethodOfPayment: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.invoiceMethodOfPayment ||
              '',
            [Validators.required]
          ),
          invoiceMethodOfPaymentForCashBill: new UntypedFormControl(
            this.settingsStoreService.getSettings()
              ?.invoiceMethodOfPaymentForCashBill || '',
            [Validators.required]
          ),
          invoiceTaxFreeText: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.invoiceTaxFreeText || '',
            [Validators.required]
          ),
          invoicePlaceOfIssue: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.invoicePlaceOfIssue || '',
            [Validators.required]
          ),
          invoiceCurrency: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.invoiceCurrency || '',
            [Validators.required]
          ),
          invoiceCountry: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.invoiceCountry || '',
            [Validators.required]
          ),
          invoiceVatRate: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.invoiceVatRate || 0,
            [Validators.required]
          ),
          invoiceCompanyName: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.invoiceCompanyName || '',
            [Validators.required]
          ),
          invoiceCompanyStreet: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.invoiceCompanyStreet || '',
            [Validators.required]
          ),
          invoiceZipCodeCity: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.invoiceZipCodeCity || '',
            [Validators.required]
          ),
          invoiceContactsPhoneFax: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.invoiceContactsPhoneFax ||
              '',
            [Validators.required]
          ),
          invoiceCompanyDescription: new UntypedFormControl(
            this.settingsStoreService.getSettings()
              ?.invoiceCompanyDescription || '',
            [Validators.required]
          ),
          invoiceBankAccounts: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.invoiceBankAccounts || '',
            [Validators.required]
          ),
          invoiceComplaints: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.invoiceComplaints || '',
            [Validators.required]
          ),
          invoiceForeignNote: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.invoiceForeignNote || '',
            [Validators.required]
          ),
          invoiceForeignNotes: new UntypedFormArray([]),
          qrCodeShowOnInvoice: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.qrCodeShowOnInvoice,
            [Validators.required]
          ),
          qrCodeIdentCode: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.qrCodeIdentCode || '',
            [Validators.required]
          ),
          qrCodeVersion: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.qrCodeVersion || '',
            [Validators.required]
          ),
          qrCodeSignSet: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.qrCodeSignSet || '',
            [Validators.required]
          ),
          qrCodeAccountNumber: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.qrCodeAccountNumber || '',
            [Validators.required]
          ),
          qrCodeCompanyName: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.qrCodeCompanyName || '',
            [Validators.required]
          ),
          qrCodeCurrency: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.qrCodeCurrency || '',
            [Validators.required]
          ),
          qrCodePayingCodePerson: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.qrCodePayingCodePerson ||
              '',
            [Validators.required]
          ),
          qrCodePayingCodeCompany: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.qrCodePayingCodeCompany ||
              '',
            [Validators.required]
          ),
          qrCodePayingPurpose: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.qrCodePayingPurpose || '',
            [Validators.required]
          ),
          termoizolacGlassMinArea: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.termoizolacGlassMinArea ||
              0,
            [Validators.required]
          ),
          constructionMeasureCM: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.constructionMeasureCM || 0,
            [Validators.required]
          ),
          workOrderPlaceOfIssue: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.workOrderPlaceOfIssue ||
              '',
            [Validators.required]
          ),
          workOrderCompanyDescription: new UntypedFormControl(
            this.settingsStoreService.getSettings()
              ?.workOrderCompanyDescription || '',
            [Validators.required]
          ),
          workOrderHeadingLine1: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.workOrderHeadingLine1 ||
              '',
            [Validators.required]
          ),
          workOrderHeadingLine2: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.workOrderHeadingLine2 ||
              '',
            [Validators.required]
          ),
          workOrderHeadingLine3: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.workOrderHeadingLine3 ||
              '',
            [Validators.required]
          ),
          keyAPI: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.keyAPI || '',
            [Validators.required]
          ),
          requestIDcharsNumber: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.requestIDcharsNumber || 0,
            [Validators.required]
          ),
          urlImportSalesUbl: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.urlImportSalesUbl || '',
            [Validators.required]
          ),
          urlDownloadSalesUbl: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.urlDownloadSalesUbl || '',
            [Validators.required]
          ),
          customizationID: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.customizationID || '',
            [Validators.required]
          ),
          invoiceTypeCodeCommercialInvoice: new UntypedFormControl(
            this.settingsStoreService.getSettings()
              ?.invoiceTypeCodeCommercialInvoice || '',
            [Validators.required]
          ),
          invoiceTypeCodeAdvanceInvoice: new UntypedFormControl(
            this.settingsStoreService.getSettings()
              ?.invoiceTypeCodeAdvanceInvoice || '',
            [Validators.required]
          ),
          documentCurrencyCode: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.documentCurrencyCode || '',
            [Validators.required]
          ),
          schemeID: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.schemeID || '',
            [Validators.required]
          ),
          jbkjsPrefix: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.jbkjsPrefix || '',
            [Validators.required]
          ),
          invoiceTaxPeriodByDateOfTurnover: new UntypedFormControl(
            this.settingsStoreService.getSettings()
              ?.invoiceTaxPeriodByDateOfTurnover || '',
            [Validators.required]
          ),
          invoiceTaxPeriodByDateOfCreate: new UntypedFormControl(
            this.settingsStoreService.getSettings()
              ?.invoiceTaxPeriodByDateOfCreate || '',
            [Validators.required]
          ),
          invoiceTaxPeriodByDateOfPaying: new UntypedFormControl(
            this.settingsStoreService.getSettings()
              ?.invoiceTaxPeriodByDateOfPaying || '',
            [Validators.required]
          ),
          sellerPIB: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.sellerPIB || '',
            [Validators.required]
          ),
          sellerName: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.sellerName || '',
            [Validators.required]
          ),
          sellerStreetName: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.sellerStreetName || '',
            [Validators.required]
          ),
          sellerCity: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.sellerCity || '',
            [Validators.required]
          ),
          sellerPostalCode: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.sellerPostalCode || '',
            [Validators.required]
          ),
          sellerCountry: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.sellerCountry || '',
            [Validators.required]
          ),
          sellerAccount: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.sellerAccount || '',
            [Validators.required]
          ),
          taxScheme: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.taxScheme || '',
            [Validators.required]
          ),
          taxCountrySign: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.taxCountrySign || '',
            [Validators.required]
          ),
          sellerMaticalNumber: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.sellerMaticalNumber || '',
            [Validators.required]
          ),
          sellerElectronicMail: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.sellerElectronicMail || '',
            [Validators.required]
          ),
          paymentMeansCode: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.paymentMeansCode || '',
            [Validators.required]
          ),
          modelPaymentCode: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.modelPaymentCode || '',
            [Validators.required]
          ),
          invoiceCurrencyEInvoice: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.invoiceCurrencyEInvoice ||
              '',
            [Validators.required]
          ),
          digitsCountForInvoice: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.digitsCountForInvoice || 0,
            [Validators.required]
          ),
          digitsCountForTaxInvoice: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.digitsCountForTaxInvoice ||
              0,
            [Validators.required]
          ),
          standardVATRate: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.standardVATRate || 0,
            [Validators.required]
          ),
          categoryForStandardVAT: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.categoryForStandardVAT ||
              '',
            [Validators.required]
          ),
          privillegedVATRate: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.privillegedVATRate || 20,
            [Validators.required]
          ),
          categoryForPrivillegedVAT: new UntypedFormControl(
            this.settingsStoreService.getSettings()
              ?.categoryForPrivillegedVAT || '',
            [Validators.required]
          ),
          unitCodeForMeter2: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.unitCodeForMeter2 || '',
            [Validators.required]
          ),
          unitCodeForMeter: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.unitCodeForMeter || '',
            [Validators.required]
          ),
          unitCodeForHour: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.unitCodeForHour || '',
            [Validators.required]
          ),
          unitCodeForPieces: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.unitCodeForPieces || '',
            [Validators.required]
          ),
          unitCodeForKilograme: new UntypedFormControl(
            this.settingsStoreService.getSettings()?.unitCodeForKilograme || '',
            [Validators.required]
          ),
        });
        this.settingsStoreService
          .getSettings()
          ?.invoiceForeignNotes?.forEach((note) => {
            this.addNote({ key: note.key, value: note.value });
          });
      }
    });
  }

  addNote(note: { key: string; value: string }): void {
    this.invoiceForeignNotesFormArr.push(
      new UntypedFormGroup({
        key: new UntypedFormControl(note?.key || '', [Validators.required]),
        value: new UntypedFormControl(note?.value || '', [Validators.required]),
      })
    );
  }

  removeNote(index: number): void {
    this.invoiceForeignNotesFormArr.removeAt(index);
    this.formGroup.markAsDirty();
  }

  hasPrivilege(privilege: string): boolean {
    return this.authStoreService.isAllowed(privilege);
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
