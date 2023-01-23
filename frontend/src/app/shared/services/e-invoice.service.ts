import { Injectable } from '@angular/core';
import { InvoiceModel } from '../models/invoice.model';
import { AppSettings, SettingsStoreService } from './settings-store.service';

@Injectable()
export class EInvoiceService {
  constructor(private settingsStoreService: SettingsStoreService) {} // private translateService: TranslateService // private sweetAlertService: SweetAlertService, // private basicAlertService: BasicAlertService,

  getXMLForInvoice(invoice: InvoiceModel): string {
    let settings: AppSettings | undefined =
      this.settingsStoreService.getSettings();
    settings;
    let xmlText: string = '';
    switch (invoice.type) {
      case 'DOMESTIC':
        // regular invoice
        const object: InvoiceXML = this.generateXMLForRegularInvoice(invoice);
        console.log('object');
        console.log(object);
        // invoice without VAT
        // invoice for public procurement
        // final invoice
        // invoice with maturity
        break;
      case 'ADVANCE_INVOICE':
        xmlText = this.generateXMLForAdvanceInvoice(invoice);
    }
    return xmlText;
  }

  private generateXMLForRegularInvoice(invoice: InvoiceModel): InvoiceXML {
    // TODO
    let invoiceXML: InvoiceXML = new InvoiceXML();
    invoiceXML.ID = invoice.number;
    invoiceXML.IssueDate = invoice.dateOfCreate + '';
    invoiceXML.DueDate = invoice.dateOfMaturity + '';
    invoiceXML.InvoiceTypeCode = '380';
    invoiceXML.DocumentCurrencyCode = invoice.currency;
    invoiceXML.InvoicePeriod = { DescriptionCode: '35' };
    invoiceXML.ContractDocumentReference = { ID: invoice.number };
    // invoiceXML.AccountingSupplierParty=;
    invoiceXML.AccountingCustomerParty = {
      Party: {
        EndpointID: invoice.buyer.pib,
        PartyIdentification: {
          ID: invoice.buyer.jbkjs || '',
        },
        PartyName: {
          Name: invoice.buyer.name,
        },
        PostalAddress: {
          StreetName: invoice.buyer.address,
          CityName: invoice.buyer.city?.name || '',
          Country: {
            IdentificationCode:
              invoice.buyer.city?.country?.identificationCode || '',
          },
        },
        PartyTaxScheme: {
          CompanyID: 'RS' + invoice.buyer.pib,
          TaxScheme: {
            ID: 'VAT',
          },
        },
        PartyLegalEntity: {
          RegistrationName: invoice.buyer.name,
          CompanyID: invoice.buyer.maticalNumber,
        },
        Contact: {
          ElectronicMail: invoice.buyer.email,
        },
      },
    };
    invoiceXML.Delivery = { ActualDeliveryDate: invoice.dateOfCreate + '' };
    invoiceXML.PaymentMeans = {
      PaymentMeansCode: '30',
      PaymentID: invoice.number,
      PayeeFinancialAccount: {
        ID: invoice.buyer.account || '',
      },
    };
    invoiceXML.TaxTotal = {
      TaxAmount: invoice.vatAmount,
      TaxSubtotal: [
        {
          TaxableAmount: invoice.netAmount,
          TaxAmount: invoice.vatAmount,
          TaxCategory: {
            ID: 'S',
            Percent: invoice.vatRate,
            TaxScheme: {
              ID: 'VAT',
            },
          },
        },
      ],
    };
    invoiceXML.LegalMonetaryTotal = {
      LineExtensionAmount: invoice.netAmount,
      TaxExclusiveAmount: invoice.netAmount,
      TaxInclusiveAmount: invoice.netAmount,
      AllowanceTotalAmount: invoice.netAmount,
      PrepaidAmount: 0,
      PayableAmount: invoice.grossAmount,
    };
    console.log('invoice');
    console.log(invoice);
    invoice.invoiceItems.forEach((invoiceItem, index) => {
      invoiceXML.InvoiceLine.push({
        ID: index + 1,
        InvoicedQuantity: invoiceItem.quantity,
        LineExtensionAmount: invoiceItem.netPrice,
        Item: {
          Name: invoiceItem.description,
          SellersItemIdentification: {
            ID: 1,
          },
          ClassifiedTaxCategory: {
            ID: 'S',
            Percent: invoiceItem.vatRate,
            TaxScheme: {
              ID: 'VAT',
            },
          },
        },
        Price: {
          PriceAmount: invoiceItem.pricePerUnit,
        },
      });
    });
    return invoiceXML;
  }

  private generateXMLForAdvanceInvoice(invoice: InvoiceModel): string {
    let xmlText: string = '';
    // TODO
    return xmlText;
  }
}

class InvoiceXML {
  CustomizationID: string = '';
  ID: string = '';
  IssueDate: string = '';
  DueDate: string = '';
  InvoiceTypeCode: string = '';
  DocumentCurrencyCode: string = '';
  InvoicePeriod!: {
    DescriptionCode: string;
  };
  ContractDocumentReference!: {
    ID: string;
  };
  AccountingSupplierParty!: {
    Party: {
      EndpointID: string;
      PartyName: {
        Name: string;
      };
      PostalAddress: {
        CityName: string;
        Country: {
          IdentificationCode: string;
        };
      };
      PartyTaxScheme: {
        CompanyID: string;
        TaxScheme: {
          ID: string;
        };
      };
      PartyLegalEntity: {
        RegistrationName: string;
        CompanyID: string;
      };
      Contact: {
        ElectronicMail: string;
      };
    };
  };
  AccountingCustomerParty!: {
    Party: {
      EndpointID: string;
      PartyIdentification: {
        ID: string;
      };
      PartyName: {
        Name: string;
      };
      PostalAddress: {
        StreetName: string;
        CityName: string;
        Country: {
          IdentificationCode: string;
        };
      };
      PartyTaxScheme: {
        CompanyID: string;
        TaxScheme: {
          ID: string;
        };
      };
      PartyLegalEntity: {
        RegistrationName: string;
        CompanyID: string;
      };
      Contact: {
        ElectronicMail: string;
      };
    };
  };
  Delivery!: {
    ActualDeliveryDate: string;
  };
  PaymentMeans!: {
    PaymentMeansCode: string;
    PaymentID: string;
    PayeeFinancialAccount: {
      ID: string;
    };
  };
  TaxTotal!: {
    TaxAmount: number;
    TaxSubtotal: [
      {
        TaxableAmount: number;
        TaxAmount: number;
        TaxCategory: {
          ID: string;
          Percent: number;
          TaxExemptionReasonCode?: string;
          TaxScheme: {
            ID: string;
          };
        };
      }
    ];
  };
  LegalMonetaryTotal!: {
    LineExtensionAmount: number;
    TaxExclusiveAmount: number;
    TaxInclusiveAmount: number;
    AllowanceTotalAmount: number;
    PrepaidAmount: number;
    PayableAmount: number;
  };
  InvoiceLine: {
    ID: number;
    InvoicedQuantity: number;
    LineExtensionAmount: number;
    Item: {
      Name: string;
      SellersItemIdentification: {
        ID: number;
      };
      ClassifiedTaxCategory: {
        ID: string;
        Percent: number;
        TaxScheme: {
          ID: string;
        };
      };
    };
    Price: {
      PriceAmount: number;
    };
  }[] = [];
}
