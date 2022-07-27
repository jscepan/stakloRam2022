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
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
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

  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isLoading: Observable<boolean> = this.isLoading$.asObservable();
  selection: string[] = [];

  items: { item: WorkOrderSelectionItem; object: WorkOrderModel }[] = [];

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
    this.isLoading$.next(true);
    this.subs.sink = this.webService
      .getAllUnsettledWorkOrderForBuyer(this.buyerOID)
      .pipe(
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((workOrders: WorkOrderModel[]) => {
        this.items = workOrders.map((wo) => {
          return {
            item: {
              oid: wo.oid,
              date: wo.dateOfCreate,
              number: getWorkOrderNumber(wo),
              forPerson: wo.forPerson,
              note: wo.note,
              description: wo.description,
            },
            object: wo,
          };
        });
      });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  handleItemClick(card: WorkOrderSelectionItem): void {
    this.items = this.items.map((item) => {
      if (this.isSingleSelection) {
        return {
          ...item,
          item: { ...item.item, selected: item.item.oid === card.oid },
        };
      } else {
        if (item.item.oid === card.oid) {
          return {
            ...item,
            item: { ...item.item, selected: !item.item.selected },
          };
        }
        return { ...item };
      }
    });
    this.updateSelection();
  }

  updateSelection(): void {
    this.selection = [];
    this.items.forEach((item) => {
      if (item.item.selected) {
        this.selection.push(item.item.oid);
      }
    });
  }

  public saveSelection(): void {
    const selected: WorkOrderModel[] = [];
    this.items.forEach((wo) => {
      if (wo.item.selected) {
        selected.push(wo.object);
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
