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
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { SERVICE_STATUSES } from 'src/app/shared/constants';
import { EnumValueModel } from 'src/app/shared/enums/enum.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { ServiceModel } from 'src/app/shared/models/service.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { getServiceNumber } from 'src/app/shared/utils';
import { ServiceWebService } from 'src/app/web-services/service.web-service';
import { SelectionItem } from './task-selection-item/task-selection-item.interface';

export interface DialogData {
  buyerOID: string;
  excludedOids: string[];
  isSingleSelection: boolean;
  items: SelectionItem[];
}

@Component({
  selector: 'app-tasks-selection-popup',
  templateUrl: './tasks-selection-popup.component.html',
  styleUrls: ['./tasks-selection-popup.component.scss'],
  providers: [ServiceWebService, ListEntities],
})
export class TasksSelectionPopupComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subs: SubscriptionManager = new SubscriptionManager();

  buyerOID: string = '';
  public excludedOids: string[] = [];
  public isSingleSelection: boolean = false;

  entities?: Observable<ServiceModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;

  public items: SelectionItem[] = [];
  hasSelected: boolean = false;
  statusOptions: EnumValueModel[] = SERVICE_STATUSES;

  searchFilter: SearchModel = new SearchModel();

  constructor(
    private dialogRef: MatDialogRef<TasksSelectionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private webService: ServiceWebService,
    private listEntities: ListEntities<ServiceModel>
  ) {
    this.buyerOID = data.buyerOID;
    this.excludedOids = data?.excludedOids || [];
    this.isSingleSelection = !(data.isSingleSelection === false);
    this.items = data.items;
  }

  ngOnInit(): void {
    if (this.buyerOID) {
      this.searchFilter.objectsOIDS = [
        { buyer: [this.buyerOID] },
        { invoiceItemOid: ['null'] },
      ];
      this.searchFilter.attributes = [{ status: [] }];
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
                this.statusOptions.find((s) => s.value === task.status)
                  ?.displayName || '',
              number: getServiceNumber(task),
              title: task.title,
              userName: task.currentUser.fullName,
              selected: this.excludedOids.includes(task.oid),
            };
          });
      });
    } else {
      this.globalService.showBasicAlert(
        MODE.error,
        this.translateService.instant('error'),
        this.translateService.instant('youDidntSelectAnyBuyer')
      );
      this.cancelSaveSelection();
    }
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
