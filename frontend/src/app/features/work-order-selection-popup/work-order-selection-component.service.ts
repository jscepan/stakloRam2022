import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { WorkOrderModel } from 'src/app/shared/models/work-order';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { WorkOrderSelectionPopupComponent } from './work-order-selection-popup.component';

@Injectable()
export class WorkOrderSelectionComponentService {
  private subs = new SubscriptionManager();

  constructor(private _matDialog: MatDialog) {}

  openDialog(
    buyerOID: string,
    excludedOids: string[] = [],
    isSingleSelection: boolean = false
  ): Observable<WorkOrderModel[] | undefined> {
    return new Observable((observer: Subscriber<WorkOrderModel[]>) => {
      const config: MatDialogConfig = new MatDialogConfig();
      config.width = '80%';
      config.height = '80%';
      config.data = {
        buyerOID,
        excludedOids,
        isSingleSelection,
      };

      this.subs.sink.$openSelectPopup = this._matDialog
        .open(WorkOrderSelectionPopupComponent, config)
        .afterClosed()
        .subscribe(
          (items: WorkOrderModel[]) => {
            observer.next(items);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
