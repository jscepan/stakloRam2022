import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { PasswordResetComponent } from './password-reset.component';

@Injectable()
export class PasswordResetPopupService {
  constructor(private _matDialog: MatDialog) {}

  openDialog(oid: string = ''): Observable<boolean> {
    return new Observable((observer: Subscriber<boolean>) => {
      const config: MatDialogConfig = new MatDialogConfig();

      config.data = {
        oid,
      };

      this._matDialog
        .open(PasswordResetComponent, config)
        .afterClosed()
        .subscribe(
          (isReseted: boolean) => {
            observer.next(isReseted);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
