import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { IncomeModel } from 'src/app/shared/models/income.model';
import { IncomeCreateEditComponent } from './income-create-edit.component';

@Injectable()
export class IncomeCreateEditPopupService {
  constructor(private _matDialog: MatDialog) {}

  openDialog(
    oid: string = '',
    buyerOID?: string,
    amount: number = 0
  ): Observable<IncomeModel> {
    return new Observable((observer: Subscriber<IncomeModel>) => {
      const config: MatDialogConfig = new MatDialogConfig();

      config.data = {
        oid,
        buyerOID,
        amount,
      };

      this._matDialog
        .open(IncomeCreateEditComponent, config)
        .afterClosed()
        .subscribe(
          (income: IncomeModel) => {
            observer.next(income);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
