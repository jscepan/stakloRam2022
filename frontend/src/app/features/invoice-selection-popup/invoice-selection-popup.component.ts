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
import { INVOICE_TYPES } from 'src/app/shared/constants';
import { EnumValueModel } from 'src/app/shared/enums/enum.model';
import { InvoiceModel } from 'src/app/shared/models/invoice.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { InvoiceWebService } from 'src/app/web-services/invoice.web-service';
import { SelectionItem } from './invoice-selection-item/invoice-selection-item.interface';

export interface DialogData {
  invoiceType: string;
  buyerOID: string;
  excludedOids: string[];
  isSingleSelection: boolean;
  items: SelectionItem[];
}

@Component({
  selector: 'app-invoice-selection-popup',
  templateUrl: './invoice-selection-popup.component.html',
  styleUrls: ['./invoice-selection-popup.component.scss'],
  providers: [InvoiceWebService, ListEntities],
})
export class InvoiceSelectionPopupComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subs: SubscriptionManager = new SubscriptionManager();

  buyerOID: string = '';
  invoiceType: string = '';
  public excludedOids: string[] = [];
  public isSingleSelection: boolean = true;

  entities?: Observable<InvoiceModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;

  public items: SelectionItem[] = [];
  hasSelected: boolean = false;
  invoiceTypes: EnumValueModel[] = INVOICE_TYPES;

  searchFilter: SearchModel = new SearchModel();

  constructor(
    private dialogRef: MatDialogRef<InvoiceSelectionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private webService: InvoiceWebService,
    private listEntities: ListEntities<InvoiceModel>
  ) {
    this.invoiceType = data.invoiceType;
    this.buyerOID = data.buyerOID;
    this.excludedOids = data?.excludedOids || [];
    this.isSingleSelection = !(data.isSingleSelection === false);
    this.items = data.items;
  }

  ngOnInit(): void {
    this.searchFilter.attributes = [{ type: [this.invoiceType] }];
    this.searchFilter.objectsOIDS = [{ buyer: [this.buyerOID] }];
    this.subs.sink = this.listEntities
      .setWebService(this.webService)
      .setFilter(this.searchFilter);

    this.entities?.subscribe((tasks) => {
      this.items = tasks
        .filter((task) => {
          return !this.excludedOids.includes(task.oid);
        })
        .map((task) => {
          return {
            oid: task.oid,
            status:
              this.invoiceTypes.find((s) => s.value === task.comment)
                ?.displayName || '',
            number: task.number,
            title: task.comment,
            userName: task.buyer.name,
            selected: this.excludedOids.includes(task.oid),
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

  handleItemClick(card: SelectionItem): void {
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
    this.entities?.subscribe((tasks) => {
      this.dialogRef.close(
        tasks.filter((task) =>
          selectedItems.find((item) => item.oid === task.oid)
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
