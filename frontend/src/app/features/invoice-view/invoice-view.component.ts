import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { InvoiceModel } from 'src/app/shared/models/invoice.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import {
  AppSettings,
  SettingsStoreService,
} from 'src/app/shared/services/settings-store.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { getUOMDisplayValue } from 'src/app/shared/utils';
import { InvoiceWebService } from 'src/app/web-services/invoice.web-service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss'],
  providers: [InvoiceWebService],
})
export class InvoiceViewComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  invoiceOID: string | null = null;
  invoice!: InvoiceModel;
  settings?: AppSettings;
  getUOMDisplayValue = getUOMDisplayValue;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private webService: InvoiceWebService,
    private settingsStoreService: SettingsStoreService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.invoiceOID = this.route.snapshot.paramMap.get('invoiceOID');

    this.subs.sink = this.settingsStoreService.dataLoaded$.subscribe(
      (dataLoaded) => {
        if (dataLoaded) {
          this.settings = this.settingsStoreService.getSettings();

          if (this.invoiceOID) {
            this.subs.sink = this.webService
              .getEntityByOid(this.invoiceOID)
              .subscribe((invoice) => {
                this.invoice = invoice;
              });
          }
        }
      }
    );
  }

  getQrCodeDataForInvoice(invoice: InvoiceModel): string {
    let qrCode = '';
    qrCode += 'K:' + this.settings?.qrCodeIdentCode;
    qrCode += '|V:' + this.settings?.qrCodeVersion;
    qrCode += '|C:' + this.settings?.qrCodeSignSet;
    qrCode += '|R:' + this.settings?.qrCodeAccountNumber;
    qrCode += '|N:' + this.settings?.qrCodeCompanyName;
    qrCode +=
      '|I:' +
      this.settings?.qrCodeCurrency +
      this.formatAmountToAppropriateQRCodeValue(invoice.grossAmount);
    qrCode += '|P:' + invoice.buyer.name;
    qrCode +=
      '|SF:' +
      (invoice.buyer.type === 'PERSON'
        ? this.settings?.qrCodePayingCodePerson
        : this.settings?.qrCodePayingCodeCompany);
    qrCode += '|S:' + this.settings?.qrCodePayingPurpose + ' ' + invoice.number;
    qrCode += '|RO:' + this.getPayingModelForInvoice(invoice);
    return qrCode;
  }

  formatAmountToAppropriateQRCodeValue(value: number): string {
    let amount = value + '';
    return amount.replace('.', ',');
  }

  getPayingModelForInvoice(invoice: InvoiceModel): string {
    let value: string = '00';
    const possibleChars: string[] = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ];
    for (var i = 0; i < invoice.number.length; i++) {
      let char = invoice.number.charAt(i);
      if (char && possibleChars.includes(char.toLowerCase())) {
        value += char;
      } else if (char === '/' || char === '_') {
        value += '-';
      }
    }
    return value;
  }

  isForeignCountry(country?: string): boolean {
    console.log(
      'this.settings?.invoiceCountry: ' + this.settings?.invoiceCountry
    );
    return (
      this.settings?.invoiceCountry?.toLowerCase() !== country?.toLowerCase()
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
