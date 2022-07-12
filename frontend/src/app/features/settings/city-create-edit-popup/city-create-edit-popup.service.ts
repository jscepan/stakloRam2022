import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { CityModel } from 'src/app/shared/models/city.model';
import { CityCreateEditComponent } from './city-create-edit.component';

@Injectable()
export class CityCreateEditPopupService {
  constructor(private _matDialog: MatDialog) {}

  openDialog(oid: string = ''): Observable<CityModel> {
    return new Observable((observer: Subscriber<CityModel>) => {
      const config: MatDialogConfig = new MatDialogConfig();

      config.data = {
        oid,
      };

      this._matDialog
        .open(CityCreateEditComponent, config)
        .afterClosed()
        .subscribe(
          (city: CityModel) => {
            observer.next(city);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
