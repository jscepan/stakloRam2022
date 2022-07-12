import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { InvoiceModel } from 'src/app/shared/models/invoice.model';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { InvoiceSelectionPopupComponent } from './invoice-selection-popup.component';

@Injectable()
export class InvoiceSelectionComponentService {
  private subs = new SubscriptionManager();

  constructor(private _matDialog: MatDialog) {}

  openDialog(
    invoiceType: string,
    buyerOID: string,
    excludedOids: string[] = [],
    isSingleSelection: boolean = true
  ): Observable<InvoiceModel[]> {
    return new Observable((observer: Subscriber<InvoiceModel[]>) => {
      const config: MatDialogConfig = new MatDialogConfig();
      config.width = '80%';
      config.height = '80%';
      config.data = {
        invoiceType,
        buyerOID,
        excludedOids,
        isSingleSelection,
      };

      this.subs.sink.$openSelectPopup = this._matDialog
        .open(InvoiceSelectionPopupComponent, config)
        .afterClosed()
        .subscribe(
          (tasks: InvoiceModel[]) => {
            observer.next(tasks);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
