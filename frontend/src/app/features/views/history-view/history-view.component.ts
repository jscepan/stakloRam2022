import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { BuyerWebService } from 'src/app/web-services/buyer.web-service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistoryWebService } from 'src/app/web-services/history.web-service';
import { HistoryModel } from 'src/app/shared/models/history.model';
import { finalize } from 'rxjs/operators';

export interface DialogData {
  oid: string;
}

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.scss'],
  providers: [HistoryWebService, BuyerWebService, ListEntities],
})
export class HistoryViewComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  isLoading?: boolean = true;
  history!: HistoryModel;

  constructor(
    private dialogRef: MatDialogRef<HistoryViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private webService: HistoryWebService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subs.sink = this.webService
      .getEntityByOid(this.data.oid)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((history) => {
        this.history = history;
      });
  }

  exit(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
