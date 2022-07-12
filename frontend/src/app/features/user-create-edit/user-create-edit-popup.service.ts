import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user.model';
import { UserCreateEditComponent } from './user-create-edit.component';

@Injectable()
export class UserCreateEditPopupService {
  constructor(private _matDialog: MatDialog) {}

  openDialog(oid: string = ''): Observable<UserModel> {
    return new Observable((observer: Subscriber<UserModel>) => {
      const config: MatDialogConfig = new MatDialogConfig();

      config.data = {
        oid,
      };

      this._matDialog
        .open(UserCreateEditComponent, config)
        .afterClosed()
        .subscribe(
          (user: UserModel) => {
            observer.next(user);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
