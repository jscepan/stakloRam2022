import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { CountryModel } from 'src/app/shared/models/country.model';
import { CountryCreateEditComponent } from './country-create-edit.component';

@Injectable()
export class CountryCreateEditPopupService {
  constructor(private _matDialog: MatDialog) {}

  openDialog(oid: string = ''): Observable<CountryModel> {
    return new Observable((observer: Subscriber<CountryModel>) => {
      const config: MatDialogConfig = new MatDialogConfig();

      config.data = {
        oid,
      };

      this._matDialog
        .open(CountryCreateEditComponent, config)
        .afterClosed()
        .subscribe(
          (country: CountryModel) => {
            observer.next(country);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
