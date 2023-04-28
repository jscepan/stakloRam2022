import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseWebService } from 'src/app/core/services/base.web-service';
import { BASE_API_URL } from '../constants';

export class AppSettings {
  companyEmail?: string;
  companyWebsite?: string;

  invoiceMethodOfPayment?: string;
  invoiceMethodOfPaymentForCashBill?: string;
  invoiceTaxFreeText?: string;
  invoicePlaceOfIssue?: string;
  invoiceCurrency?: string;
  invoiceCountry?: string;
  invoiceVatRate?: number;
  invoiceCompanyName?: string;
  invoiceCompanyStreet?: string;
  invoiceZipCodeCity?: string;
  invoiceContactsPhoneFax?: string;
  invoiceCompanyDescription?: string;
  invoiceBankAccounts?: string;
  invoiceComplaints?: string;
  invoiceForeignNote?: string;
  invoiceForeignNotes?: { key: string; value: string }[];

  qrCodeShowOnInvoice?: boolean;
  qrCodeIdentCode?: string;
  qrCodeVersion?: string;
  qrCodeSignSet?: string;
  qrCodeAccountNumber?: string;
  qrCodeCompanyName?: string;
  qrCodeCurrency?: string;
  qrCodePayingCodePerson?: string;
  qrCodePayingCodeCompany?: string;
  qrCodePayingPurpose?: string;

  termoizolacGlassMinArea?: number;
  constructionMeasureCM?: number;
  workOrderPlaceOfIssue?: string;
  workOrderCompanyDescription?: string;
  workOrderHeadingLine1?: string;
  workOrderHeadingLine2?: string;
  workOrderHeadingLine3?: string;

  keyAPI?: string;
  requestIDcharsNumber?: number;
  urlImportSalesUbl?: string;
  customizationID?: string;
  invoiceTypeCodeCommercialInvoice?: string;
  invoiceTypeCodeAdvanceInvoice?: string;
  documentCurrencyCode?: string;
  schemeID?: string;
  jbkjsPrefix?: string;
  invoiceTaxPeriodByDateOfTurnover?: string;
  invoiceTaxPeriodByDateOfCreate?: string;
  invoiceTaxPeriodByDateOfPaying?: string;
  sellerPIB?: string;
  sellerName?: string;
  sellerStreetName?: string;
  sellerCity?: string;
  sellerPostalCode?: string;
  sellerCountry?: string;
  sellerAccount?: string;
  taxScheme?: string;
  taxCountrySign?: string;
  sellerMaticalNumber?: string;
  sellerElectronicMail?: string;
  paymentMeansCode?: string;
  modelPaymentCode?: string;
  invoiceCurrencyEInvoice?: string;
  digitsCountForInvoice?: number;
  digitsCountForTaxInvoice?: number;
  standardVATRate?: number;
  categoryForStandardVAT?: string;
  privillegedVATRate?: number;
  categoryForPrivillegedVAT?: string;
  unitCodeForMeter2?: string;
  unitCodeForMeter?: string;
  unitCodeForHour?: string;
  unitCodeForPieces?: string;
  unitCodeForKilograme?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsStoreService {
  private settings$: BehaviorSubject<AppSettings | undefined> =
    new BehaviorSubject<AppSettings | undefined>(undefined);
  public settings: Observable<AppSettings | undefined> =
    this.settings$.asObservable();

  private readonly _dataLoaded = new BehaviorSubject<boolean>(false);
  readonly dataLoaded$ = this._dataLoaded.asObservable();

  constructor(public baseWebService: BaseWebService) {
    this.baseWebService
      .getRequest<AppSettings>(`${BASE_API_URL + '/settings'}`, AppSettings)
      .subscribe((settings) => {
        if (settings) {
          this.settings$.next(settings);
          this._dataLoaded.next(true);
        }
      });
  }

  getSettings(): AppSettings | undefined {
    return this.settings$.getValue();
  }

  updateSettings(settings: AppSettings): Observable<boolean> {
    this._dataLoaded.next(false);
    return new Observable((subscriber) => {
      this.baseWebService
        .putRequest<AppSettings, AppSettings>(
          `${BASE_API_URL + '/settings'}`,
          settings,
          AppSettings
        )
        .subscribe((settings) => {
          if (settings) {
            this.settings$.next(settings);
            this._dataLoaded.next(true);
            subscriber.next(true);
            subscriber.complete();
          }
        });
    });
  }
}
