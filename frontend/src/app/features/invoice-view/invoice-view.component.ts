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
import { getDaysBetweenTwoDates } from 'src/app/shared/utils';
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
  // placeholders = {
  //   amount: 'Износ:',
  //   amountRSD: 'Износ (дин)',
  //   byInvoiceCome: 'По пријему рачуна',
  //   counter: 'Ред. бр.',
  //   dateOfInvoice: 'Датум рачуна: ',
  //   dateOfTurnover: 'Датум промета услуга:',
  //   dayFromInvoice: ' дан од дана пријема рачуна',
  //   daysFromInvoice: ' дана од дана пријема рачуна',
  //   deadline: 'Рок плаћања: ',
  //   forPay: 'За уплату (дин)',
  //   greetings: 'С поштовањем,',
  //   headerLine1: 'СТОЈКОВИЋ / STOJKOVIĆ',
  //   headerLine2: 'ORTAČKO ADVOKATSKO DRUŠTVO',
  //   incomeDoneOnName: 'Уплату извршити на име:',
  //   invoiceAdvanceNumber: 'Авансни рачун број.',
  //   invoiceCashNumber: 'Готовински рачун број.',
  //   invoicePreNumber: 'Предрачун број.',
  //   invoiceNumber: 'Рачун број.',
  //   legalServices: 'Правне услуге:',
  //   mb: 'МБ: ',
  //   noteAboutTax: 'Напомена о пореском ослобођењу: НЕМА ПОРЕСКОГ ОСЛОБОЂЕЊА',
  //   pib: 'ПИБ: ',
  //   placeOfInvoice: 'Место издавања рачуна: ',
  //   placeOfTurnover: 'Место промета услуга:',
  //   serviceDescription: 'Опис услуге',
  //   vat: 'ПДВ',
  // };
  // invoiceItemsVatRates: {
  //   netAmount: number;
  //   vatRate: number;
  //   vatAmount: number;
  // }[] = [];

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
                // this.setInvoiceItemsVatRates();
              });
          }
        }
      }
    );
  }

  // setInvoiceItemsVatRates(): void {
  //   this.invoice.invoiceItems.forEach((invoiceItem) => {
  //     let netAmount: number = invoiceItem.netPrice;
  //     let vatRate: number = invoiceItem.vatRate;
  //     let vatAmount: number = invoiceItem.vatAmount;
  //     const index: number = this.invoiceItemsVatRates.findIndex(
  //       (item) => item.vatRate === invoiceItem.vatRate
  //     );
  //     if (index >= 0) {
  //       netAmount += this.invoiceItemsVatRates[index].netAmount;
  //       vatAmount += this.invoiceItemsVatRates[index].vatAmount;
  //       this.invoiceItemsVatRates[index] = { netAmount, vatRate, vatAmount };
  //     } else {
  //       this.invoiceItemsVatRates.push({
  //         netAmount,
  //         vatRate,
  //         vatAmount,
  //       });
  //     }
  //   });
  // }

  // getInvoiceDateOfMaturity(invoice: InvoiceModel): number {
  //   return getDaysBetweenTwoDates(
  //     new Date(invoice.dateOfMaturity),
  //     new Date(invoice.dateOfCreate)
  //   );
  // }

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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
