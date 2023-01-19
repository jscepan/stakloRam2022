import { Injectable } from '@angular/core';
import { InvoiceModel } from '../models/invoice.model';
import { AppSettings, SettingsStoreService } from './settings-store.service';

@Injectable({
  providedIn: 'root',
})
export class EInvoiceService {
  constructor(private settingsStoreService: SettingsStoreService) {} // private translateService: TranslateService // private sweetAlertService: SweetAlertService, // private basicAlertService: BasicAlertService,

  generateXMLForInvoice(invoice: InvoiceModel): string {
    let settings: AppSettings | undefined =
      this.settingsStoreService.getSettings();
    settings;
    return JSON.stringify(invoice);
  }
}
