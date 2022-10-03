import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { HistoryViewComponent } from './history-view.component';

@Injectable()
export class HistoryViewPopupService {
  constructor(private _matDialog: MatDialog) {}

  openDialog(oid: string = ''): Observable<void> {
    return new Observable((observer: Subscriber<void>) => {
      const config: MatDialogConfig = new MatDialogConfig();

      config.data = {
        oid,
      };

      this._matDialog
        .open(HistoryViewComponent, config)
        .afterClosed()
        .subscribe(
          () => {
            observer.next();
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
