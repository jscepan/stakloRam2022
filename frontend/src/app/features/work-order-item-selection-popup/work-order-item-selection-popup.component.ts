import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SearchModel } from 'src/app/shared/models/search.model';
import { WorkOrderModel } from 'src/app/shared/models/work-order';
import { WorkOrderItemModel } from 'src/app/shared/models/work-order-item';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { getWorkOrderNumber } from 'src/app/shared/utils';
import { WorkOrderWebService } from 'src/app/web-services/work-order.web-service';

export interface DialogData {
  buyerOID: string;
  excludedOids: string[];
}

export interface WorkOrderSelection {
  oid: string;
  number: string;
  date: Date;
  isExpanded: boolean;
  workOrderItems: WorkOrderItemSelection[];
}
export interface WorkOrderItemSelection {
  oid: string;
  selected: boolean;
  description: string;
  uom: string;
  sumQuantity: number;
  note: string;
}
@Component({
  selector: 'app-work-order-item-selection-popup',
  templateUrl: './work-order-item-selection-popup.component.html',
  styleUrls: ['./work-order-item-selection-popup.component.scss'],
  providers: [ListEntities, WorkOrderWebService],
})
export class WorkOrderItemSelectionPopupComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subs: SubscriptionManager = new SubscriptionManager();

  buyerOID: string = '';
  invoiceType: string = '';
  public excludedOids: string[] = [];
  public isSingleSelection: boolean = true;

  entities?: Observable<WorkOrderModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;

  hasSelected: boolean = false;

  searchFilter: SearchModel = new SearchModel();
  items: WorkOrderSelection[] = [];

  constructor(
    private dialogRef: MatDialogRef<WorkOrderItemSelectionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef,
    private webService: WorkOrderWebService,
    private listEntities: ListEntities<WorkOrderModel>
  ) {
    this.buyerOID = data.buyerOID;
    this.excludedOids = data?.excludedOids || [];
  }

  ngOnInit(): void {
    this.searchFilter.objectsOIDS = [{ buyer: [this.buyerOID] }];
    this.subs.sink = this.listEntities
      .setWebService(this.webService)
      .setFilter(this.searchFilter);

    this.entities?.subscribe((workOrders) => {
      this.items = workOrders.map((wo) => {
        return {
          oid: wo.oid,
          number: getWorkOrderNumber(wo),
          date: wo.dateOfCreate,
          isExpanded: false,
          workOrderItems: [],
        };
      });
    });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  toggleExpandWorkOrder(workOrderOID: string): void {
    const selectedIndex = this.items.findIndex(
      (item) => item.oid === workOrderOID
    );
    if (!this.items[selectedIndex].isExpanded) {
      this.webService.getEntityByOid(workOrderOID).subscribe((workOrder) => {
        this.items[selectedIndex].workOrderItems = workOrder.workOrderItems
          .filter((wo) => {
            return !this.excludedOids.includes(wo.oid);
          })
          .map((item) => {
            return {
              selected: false,
              oid: item.oid,
              description: item.description,
              note: item.note,
              sumQuantity: item.sumQuantity,
              uom: item.uom,
            };
          });
      });
    } else {
      this.items[selectedIndex].workOrderItems = this.items[
        selectedIndex
      ].workOrderItems.map((item) => {
        return { ...item, selected: false };
      });
    }
    this.items[selectedIndex].isExpanded =
      !this.items[selectedIndex].isExpanded;
  }

  public saveSelection(): void {
    // let selectedItems:WorkOrderItem = [];
    // this.items.forEach((item)=>{
    //   item.workOrderItems.filter((item) => item.selected);
    // })
    // this.entities?.subscribe((items) => {
    //   this.dialogRef.close(
    //     items.filter((woi) =>
    //       selectedItems.find((item) => item.oid === woi.oid)
    //     )
    //   );
    // });
  }

  public cancelSaveSelection(): void {
    this.dialogRef.close();
  }

  bottomReachedHandler(): void {
    this.listEntities.requestNextPage();
  }

  toggleSelectAll(
    event: MatCheckboxChange,
    workOrderItem: WorkOrderSelection
  ): void {
    if (event.checked) {
      workOrderItem.workOrderItems.forEach((t) => (t.selected = true));
    } else {
      workOrderItem.workOrderItems.forEach((t) => (t.selected = false));
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
