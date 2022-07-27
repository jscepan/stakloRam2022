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
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UOM_TYPES } from 'src/app/shared/constants';
import { EnumValueModel } from 'src/app/shared/enums/enum.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { WorkOrderModel } from 'src/app/shared/models/work-order';
import { WorkOrderItemModel } from 'src/app/shared/models/work-order-item';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { getUOMDisplayValue, getWorkOrderNumber } from 'src/app/shared/utils';
import { WorkOrderWebService } from 'src/app/web-services/work-order.web-service';

export interface DialogData {
  buyerOID: string;
  excludedOids: string[];
}

export interface WorkOrderSelection {
  isExpanded: boolean;
  object: WorkOrderModel;
  workOrderItems: WorkOrderItemSelection[];
}
export interface WorkOrderItemSelection {
  selected: boolean;
  object: WorkOrderItemModel;
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
  uomOptions: EnumValueModel[] = UOM_TYPES;
  getUOMDisplayValue = getUOMDisplayValue;

  // entities?: Observable<WorkOrderModel[]> = this.listEntities.entities;
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isLoading: Observable<boolean> = this.isLoading$.asObservable();

  selection: string[] = [];

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
    this.isLoading$.next(true);
    this.webService
      .getAllUnsettledWorkOrderForBuyer(this.buyerOID)
      .pipe(
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((workOrders: WorkOrderModel[]) => {
        this.items = workOrders.map((wo) => {
          return {
            oid: wo.oid,
            isExpanded: false,
            object: wo,
            workOrderItems: [],
          };
        });
      });

    // this.searchFilter.objectsOIDS = [{ buyer: [this.buyerOID] }];
    // this.subs.sink = this.listEntities
    //   .setWebService(this.webService)
    //   .setFilter(this.searchFilter);

    // this.entities?.subscribe((workOrders) => {});
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  toggleExpandWorkOrder(workOrderOID: string): void {
    const selectedIndex = this.items.findIndex(
      (item) => item.object.oid === workOrderOID
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
              object: item,
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
    this.updateSelection();
  }

  updateSelection(): void {
    this.selection = [];
    this.items.forEach((item) => {
      item.workOrderItems.forEach((woi) => {
        if (woi.selected) {
          this.selection.push(woi.object.oid);
        }
      });
    });
  }

  public saveSelection(): void {
    const selected: WorkOrderModel[] = [];
    this.items.forEach((wo) => {
      let selectedWO: WorkOrderModel | undefined;
      wo.workOrderItems.forEach((woi) => {
        if (woi.selected) {
          if (!selectedWO) {
            selectedWO = wo.object;
          }
          selectedWO.workOrderItems.push(woi.object);
        }
      });
      if (selectedWO) {
        selected.push(selectedWO);
      }
    });
    this.dialogRef.close(selected);
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
    this.updateSelection();
  }

  isAllChecked(item: WorkOrderSelection): boolean {
    return (
      item.workOrderItems.filter((woi) => woi.selected === true).length ===
      item.workOrderItems.length
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
