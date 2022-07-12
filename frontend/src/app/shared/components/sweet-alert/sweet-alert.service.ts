import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';

import { SweetAlertI } from './sweet-alert.interface';
import { SweetAlertComponent } from './sweet-alert.component';

@Injectable()
export class SweetAlertService {
  dataToReturn: Subject<SweetAlertI> = new Subject<SweetAlertI>();

  constructor(private dialog: MatDialog) {}

  openMeSweetAlert(data: SweetAlertI): MatDialogRef<SweetAlertComponent> {
    const dialogRef = this.dialog.open(SweetAlertComponent, {
      data,
      panelClass: 'sweet-alert-dialog',
    });

    dialogRef.componentInstance.eventOccurs.subscribe(
      (event: { eventName: string; payload: SweetAlertI }) => {
        if (
          event.eventName === 'submit' ||
          event.eventName === 'confirm' ||
          event.eventName === 'ok'
        ) {
          data.confirmed = true;
          dialogRef.close(data);
        } else if (event.eventName === 'cancel') {
          data.confirmed = false;
          dialogRef.close(data);
        }
      }
    );

    dialogRef.afterClosed().subscribe((alertData: SweetAlertI) => {
      this.dataToReturn.next(alertData);
    });

    return dialogRef;
  }

  getDataBackFromSweetAlert(): Observable<SweetAlertI> {
    return this.dataToReturn.asObservable();
  }
}
