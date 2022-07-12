import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { TaskModel } from 'src/app/shared/models/task.model';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { TasksSelectionPopupComponent } from './tasks-selection-popup.component';

@Injectable()
export class TasksSelectionComponentService {
  private subs = new SubscriptionManager();

  constructor(private _matDialog: MatDialog) {}

  openDialog(
    excludedOids: string[],
    buyerOID: string
  ): Observable<TaskModel[]> {
    return new Observable((observer: Subscriber<TaskModel[]>) => {
      const config: MatDialogConfig = new MatDialogConfig();
      config.width = '80%';
      config.height = '80%';
      config.data = {
        excludedOids,
        isSingleSelection: false,
        buyerOID,
      };

      this.subs.sink.$openSelectPopup = this._matDialog
        .open(TasksSelectionPopupComponent, config)
        .afterClosed()
        .subscribe(
          (tasks: TaskModel[]) => {
            observer.next(tasks);
            observer.complete();
          },
          () => observer.error()
        );
    });
  }
}
