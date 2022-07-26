import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SearchModel } from 'src/app/shared/models/search.model';
import { WorkOrderModel } from 'src/app/shared/models/work-order';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { getWorkOrderNumber } from 'src/app/shared/utils';
import { WorkOrderWebService } from 'src/app/web-services/work-order.web-service';
import { WorkOrderSelectionItem } from './work-order-selection-item/work-order-selection-item.interface';

export interface DialogData {
  buyerOID: string;
  excludedOids: string[];
  isSingleSelection: boolean;
}

@Component({
  selector: 'app-work-order-selection-popup',
  templateUrl: './work-order-selection-popup.component.html',
  styleUrls: ['./work-order-selection-popup.component.scss'],
  providers: [ListEntities, WorkOrderWebService],
})
export class WorkOrderSelectionPopupComponent
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
  items: WorkOrderSelectionItem[] = [];

  constructor(
    private dialogRef: MatDialogRef<WorkOrderSelectionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef,
    private webService: WorkOrderWebService,
    private listEntities: ListEntities<WorkOrderModel>
  ) {
    this.buyerOID = data.buyerOID;
    this.excludedOids = data?.excludedOids || [];
    this.isSingleSelection = !(data.isSingleSelection === false);
  }

  ngOnInit(): void {
    this.searchFilter.objectsOIDS = [{ buyer: [this.buyerOID] }];
    // this.searchFilter.attributes = [{ settled: ['false'] }];
    this.subs.sink = this.listEntities
      .setWebService(this.webService)
      .setFilter(this.searchFilter);

    this.entities?.subscribe((workOrders) => {
      this.items = workOrders
        .filter((wo) => {
          return !this.excludedOids.includes(wo.oid);
        })
        .map((wo) => {
          return {
            oid: wo.oid,
            date: wo.dateOfCreate,
            number: getWorkOrderNumber(wo),
            forPerson: wo.forPerson,
            note: wo.note,
            description: wo.description,
          };
        });
    });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  inputSearchHandler(text: string): void {
    this.searchFilter.criteriaQuick = text;
    this.listEntities.setFilter(this.searchFilter);
  }

  statusTypeChanged(statuses: string[]): void {
    this.searchFilter = {
      ...this.searchFilter,
      attributes: [{ status: statuses }],
    };
    this.listEntities.setFilter(this.searchFilter);
  }

  handleItemClick(card: WorkOrderSelectionItem): void {
    this.items = this.items.map((item) => {
      if (this.isSingleSelection) {
        return { ...item, selected: item.oid === card.oid };
      } else {
        if (item.oid === card.oid) {
          return { ...item, selected: !item.selected };
        }
        return { ...item };
      }
    });
    this.hasSelected = this.items.filter((item) => item.selected).length > 0;
  }

  public saveSelection(): void {
    let selectedItems = this.items.filter((item) => item.selected);
    this.entities?.subscribe((items) => {
      this.dialogRef.close(
        items.filter((woi) =>
          selectedItems.find((item) => item.oid === woi.oid)
        )
      );
    });
  }

  public cancelSaveSelection(): void {
    this.dialogRef.close();
  }

  bottomReachedHandler(): void {
    this.listEntities.requestNextPage();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
