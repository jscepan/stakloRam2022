import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { ServiceModel } from 'src/app/shared/models/service.model';
import { ServiceCreateComponent } from './service-create.component';

@Injectable()
export class ServiceCreatePopupService {
  constructor(private _matDialog: MatDialog) {}

  openDialog(
    serviceType: string = 'case',
    parent?: ServiceModel
  ): Observable<ServiceModel> {
    return new Observable((observer: Subscriber<ServiceModel>) => {
      const config: MatDialogConfig = new MatDialogConfig();
      config.height = '80%';

      config.data = {
        serviceType,
        parent,
      };

      this._matDialog
        .open(ServiceCreateComponent, config)
        .afterClosed()
        .subscribe(
          (service: ServiceModel) => {
            observer.next(service);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
