import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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

  formGroup!: FormGroup;

  get invoiceForeignNotesFormArr(): FormArray {
    return this.formGroup.get('invoiceForeignNotes') as FormArray;
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
        this.formGroup = new FormGroup({
          companyEmail: new FormControl(
            this.settingsStoreService.getSettings()?.companyEmail || '',
            [Validators.required]
          ),
          companyWebsite: new FormControl(
            this.settingsStoreService.getSettings()?.companyWebsite || '',
            []
          ),
          invoiceMethodOfPayment: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceMethodOfPayment ||
              '',
            [Validators.required]
          ),
          invoiceMethodOfPaymentForCashBill: new FormControl(
            this.settingsStoreService.getSettings()
              ?.invoiceMethodOfPaymentForCashBill || '',
            [Validators.required]
          ),
          invoicePlaceOfIssue: new FormControl(
            this.settingsStoreService.getSettings()?.invoicePlaceOfIssue || '',
            [Validators.required]
          ),
          invoiceCurrency: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceCurrency || '',
            [Validators.required]
          ),
          invoiceCountry: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceCountry || '',
            [Validators.required]
          ),
          invoiceVatRate: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceVatRate || 0,
            [Validators.required]
          ),
          invoiceCompanyName: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceCompanyName || '',
            [Validators.required]
          ),
          invoiceCompanyStreet: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceCompanyStreet || '',
            [Validators.required]
          ),
          invoiceZipCodeCity: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceZipCodeCity || '',
            [Validators.required]
          ),
          invoiceContactsPhoneFax: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceContactsPhoneFax ||
              '',
            [Validators.required]
          ),
          invoiceCompanyDescription: new FormControl(
            this.settingsStoreService.getSettings()
              ?.invoiceCompanyDescription || '',
            [Validators.required]
          ),
          invoiceBankAccounts: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceBankAccounts || '',
            [Validators.required]
          ),
          invoiceComplaints: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceComplaints || '',
            [Validators.required]
          ),
          invoiceForeignNote: new FormControl(
            this.settingsStoreService.getSettings()?.invoiceForeignNote || '',
            [Validators.required]
          ),
          invoiceForeignNotes: new FormArray([]),
          qrCodeShowOnInvoice: new FormControl(
            this.settingsStoreService.getSettings()?.qrCodeShowOnInvoice,
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
              0,
            [Validators.required]
          ),
          constructionMeasureCM: new FormControl(
            this.settingsStoreService.getSettings()?.constructionMeasureCM || 0,
            [Validators.required]
          ),
          workOrderPlaceOfIssue: new FormControl(
            this.settingsStoreService.getSettings()?.workOrderPlaceOfIssue ||
              '',
            [Validators.required]
          ),
          workOrderCompanyDescription: new FormControl(
            this.settingsStoreService.getSettings()
              ?.workOrderCompanyDescription || '',
            [Validators.required]
          ),
          workOrderHeadingLine1: new FormControl(
            this.settingsStoreService.getSettings()?.workOrderHeadingLine1 ||
              '',
            [Validators.required]
          ),
          workOrderHeadingLine2: new FormControl(
            this.settingsStoreService.getSettings()?.workOrderHeadingLine2 ||
              '',
            [Validators.required]
          ),
          workOrderHeadingLine3: new FormControl(
            this.settingsStoreService.getSettings()?.workOrderHeadingLine3 ||
              '',
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
      new FormGroup({
        key: new FormControl(note?.key || '', [Validators.required]),
        value: new FormControl(note?.value || '', [Validators.required]),
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
