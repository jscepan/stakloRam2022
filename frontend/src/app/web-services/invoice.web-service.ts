import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArrayResponseI } from '../core/interfaces/array-response.interface';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { BASE_API_URL, DOMAIN_INVOICES } from '../shared/constants';
import { InvoiceModel } from '../shared/models/invoice.model';

@Injectable()
export class InvoiceWebService extends EntityBaseWebService<InvoiceModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, InvoiceModel, DOMAIN_INVOICES);
  }

  public getNextInvoiceNumber(invoiceType: string, date: Date = new Date()) {
    date = new Date(date);
    return this.baseWebService.getRequest<string>(
      `${
        BASE_API_URL + '/' + this.domainName
      }/number?invoiceType=${invoiceType}&year=${date.getFullYear()}`
    );
  }

  public getAllInvoiceItemDescriptions(): Observable<string[]> {
    return this.baseWebService.getRequest(
      `${BASE_API_URL + '/' + this.domainName}/invoiceItemDescriptions`
    );
  }

  public changeBuyer(
    invoiceOID: string,
    buyerOID: string
  ): Observable<boolean> {
    return this.baseWebService.postRequest(
      `${
        BASE_API_URL + '/' + this.domainName
      }/change-buyer?invoiceOID=${invoiceOID}&buyerOID=${buyerOID}`
    );
  }

  public getXMLForInvoice(invoiceOID: string): Observable<{ xmlText: string }> {
    return this.baseWebService.getRequest(
      `${BASE_API_URL + '/' + this.domainName}/getXML/` + invoiceOID
    );
  }
}
