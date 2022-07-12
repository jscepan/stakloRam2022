import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { IncomeModel } from 'src/app/shared/models/income.model';
import { OutcomeCreateEditComponent } from './outcome-create-edit.component';

@Injectable()
export class OutcomeCreateEditPopupService {
  constructor(private _matDialog: MatDialog) {}

  openDialog(oid: string = ''): Observable<IncomeModel> {
    return new Observable((observer: Subscriber<IncomeModel>) => {
      const config: MatDialogConfig = new MatDialogConfig();

      config.data = {
        oid,
      };

      this._matDialog
        .open(OutcomeCreateEditComponent, config)
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
