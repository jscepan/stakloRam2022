import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { WorkOrderModel } from 'src/app/shared/models/work-order';
import { GlobalService } from 'src/app/shared/services/global.service';
import {
  AppSettings,
  SettingsStoreService,
} from 'src/app/shared/services/settings-store.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { getWorkOrderImageUrl, getWorkOrderNumber } from 'src/app/shared/utils';
import { WorkOrderWebService } from 'src/app/web-services/work-order.web-service';

@Component({
  selector: 'app-work-order-view',
  templateUrl: './work-order-view.component.html',
  styleUrls: ['./work-order-view.component.scss'],
  providers: [WorkOrderWebService],
})
export class WorkOrderViewComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  workOrderOID: string | null = null;
  workOrder!: WorkOrderModel;
  settings?: AppSettings;
  getWorkOrderNumber = getWorkOrderNumber;
  cellRowspan: { displayCell: boolean; rowspan: number }[] = [];
  getWorkOrderImageUrl = getWorkOrderImageUrl;

  constructor(
    private route: ActivatedRoute,
    private webService: WorkOrderWebService,
    private settingsStoreService: SettingsStoreService
  ) {}

  ngOnInit(): void {
    this.workOrderOID = this.route.snapshot.paramMap.get('workOrderOID');

    this.subs.sink = this.settingsStoreService.dataLoaded$.subscribe(
      (dataLoaded) => {
        if (dataLoaded) {
          this.settings = this.settingsStoreService.getSettings();

          if (this.workOrderOID) {
            this.subs.sink = this.webService
              .getEntityByOid(this.workOrderOID)
              .subscribe((workOrder) => {
                this.workOrder = workOrder;
                this.generateTableForWorkOrderItems();
              });
          }
        }
      }
    );
  }

  generateTableForWorkOrderItems(): void {
    let rowspanCounter = 1;
    let indexOfLastForDisplay = 0;
    this.cellRowspan.push({
      displayCell: rowspanCounter === 1,
      rowspan: rowspanCounter,
    });
    for (let i = 1; i < this.workOrder.workOrderItems.length; i++) {
      if (
        this.workOrder.workOrderItems[i].description ===
        this.workOrder.workOrderItems[i - 1]?.description
      ) {
        rowspanCounter++;
      } else {
        rowspanCounter = 1;
        indexOfLastForDisplay = i;
      }
      this.cellRowspan.push({
        displayCell: rowspanCounter === 1,
        rowspan: rowspanCounter,
      });
      this.cellRowspan[indexOfLastForDisplay].rowspan = rowspanCounter;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
