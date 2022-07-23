import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { BuyerModel } from 'src/app/shared/models/buyer.model';
import { BuyerCreateEditComponent } from './buyer-create-edit.component';

@Injectable()
export class BuyerCreateEditPopupService {
  constructor(private _matDialog: MatDialog) {}

  openDialog(oid: string = ''): Observable<BuyerModel> {
    return new Observable((observer: Subscriber<BuyerModel>) => {
      const config: MatDialogConfig = new MatDialogConfig();

      config.data = {
        oid,
      };

      this._matDialog
        .open(BuyerCreateEditComponent, config)
        .afterClosed()
        .subscribe(
          (buyer: BuyerModel) => {
            observer.next(buyer);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
