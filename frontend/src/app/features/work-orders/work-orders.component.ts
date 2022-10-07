import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import {
  SweetAlertI,
  SweetAlertTypeEnum,
} from 'src/app/shared/components/sweet-alert/sweet-alert.interface';
import { SweetAlertService } from 'src/app/shared/components/sweet-alert/sweet-alert.service';
import {
  BettweenAttribute,
  SearchModel,
} from 'src/app/shared/models/search.model';
import { WorkOrderModel } from 'src/app/shared/models/work-order';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { getWorkOrderNumber } from 'src/app/shared/utils';
import { WorkOrderWebService } from 'src/app/web-services/work-order.web-service';
@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss'],
  providers: [WorkOrderWebService, SweetAlertService, ListEntities],
})
export class WorkOrdersComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  entities?: Observable<WorkOrderModel[]> = this.listEntities.entities;
  totalEntitiesLength?: Observable<number | undefined> =
    this.listEntities.totalEntitiesLength;

  keyword: string = '';

  getWorkOrderNumber = getWorkOrderNumber;

  showOnlyUnsettled: boolean = false;
  isLoadingUnsettled?: boolean = true;
  entitiesUnsettled?: WorkOrderModel[];
  totalEntitiesLengthUnsettled?: number;

  searchFilter: SearchModel = new SearchModel();

  constructor(
    private globalService: GlobalService,
    private translateService: TranslateService,
    private webService: WorkOrderWebService,
    private sweetAlertService: SweetAlertService,
    private listEntities: ListEntities<WorkOrderModel>,
    private router: Router,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit(): void {
    this.searchFilter.ordering = 'DESC';

    this.listEntities
      .setWebService(this.webService)
      .setOrdering('DESC')
      .requestFirstPage();
  }

  loadAllUnsettledWorkOrders(): void {
    this.isLoadingUnsettled = true;
    this.entitiesUnsettled = [];
    this.totalEntitiesLengthUnsettled = 0;
    this.subs.sink = this.webService
      .getAllUnsettledWorkOrderForBuyer('')
      .pipe(
        finalize(() => {
          this.isLoadingUnsettled = false;
        })
      )
      .subscribe((workOrders: WorkOrderModel[]) => {
        this.entitiesUnsettled = workOrders;
        this.totalEntitiesLengthUnsettled = workOrders.length;
      });
  }

  inputSearchHandler(text: string): void {
    this.searchFilter.criteriaQuick = text;
    this.listEntities.setFilter(this.searchFilter);
  }

  dateChanged(type: 'from' | 'to', date: any): void {
    if (date.target?.value) {
      const newBetweenAttribute: BettweenAttribute = {
        attribute: type === 'from' ? 'from_date' : 'to_date',
        attributeValue: date.target?.value,
        attributeType: 'DATE',
        type: type === 'from' ? 'GREATER_OR_EQUAL' : 'SMALLER_OR_EQUAL',
      };

      this.searchFilter.addBetweenAttribute(newBetweenAttribute);
    } else if (type === 'from') {
      this.searchFilter.removeBetweenAttribute('from_date');
    } else if (type === 'to') {
      this.searchFilter.removeBetweenAttribute('to_date');
    }
    this.listEntities.setFilter(this.searchFilter);
  }

  createWorkOrder(): void {
    this.router.navigate(['work-orders', 'create']);
  }

  viewWorkOrder(workOrderOID: string): void {
    window.open('#/print/work-order-view/' + workOrderOID);
  }

  editWorkOrder(workOrderOID: string): void {
    this.router.navigate(['work-orders', 'edit', workOrderOID]);
  }

  deleteWorkOrder(workOrder: WorkOrderModel): void {
    this.subs.sink.$deleteWorkOrder = this.sweetAlertService
      .getDataBackFromSweetAlert()
      .subscribe((data) => {
        if (data && data.confirmed) {
          this.subs.sink = this.webService
            .deleteEntity([workOrder])
            .subscribe(() => {
              this.globalService.showBasicAlert(
                MODE.success,
                this.translateService.instant('workOrderDeleted'),
                this.translateService.instant(
                  'workOrderHaveBeenSuccessfullyDeleted'
                )
              );
              this.listEntities.requestFirstPage();
            });
        }
      });
    const sweetAlertModel: SweetAlertI = {
      mode: 'warning',
      icon: 'alert-triangle',
      type: {
        name: SweetAlertTypeEnum.submit,
        buttons: {
          submit: this.translateService.instant('delete'),
          cancel: this.translateService.instant('cancel'),
        },
      },
      title: this.translateService.instant('deleteWorkOrder'),
      message: this.translateService.instant(
        'areYouSureYouWantToDeleteTheWorkOrder'
      ),
    };
    this.sweetAlertService.openMeSweetAlert(sweetAlertModel);
  }

  toggleSettledForWorkOrder(workOrder: WorkOrderModel): void {
    this.subs.sink.$markWorkOrder = this.sweetAlertService
      .getDataBackFromSweetAlert()
      .subscribe((data) => {
        if (data && data.confirmed) {
          this.subs.sink = this.webService
            .changeWorkOrderSettledStatus(workOrder.oid, this.showOnlyUnsettled)
            .subscribe((settled) => {
              if (settled) {
                this.globalService.showBasicAlert(
                  MODE.success,
                  this.translateService.instant('successfully'),
                  this.translateService.instant(
                    'workOrderIsSuccessfullyUpdated'
                  )
                );
                this.loadAllUnsettledWorkOrders();
              }
            });
        }
      });
    const sweetAlertModel: SweetAlertI = {
      mode: 'warning',
      icon: 'alert-triangle',
      type: {
        name: SweetAlertTypeEnum.submit,
        buttons: {
          submit: this.translateService.instant('mark'),
          cancel: this.translateService.instant('cancel'),
        },
      },
      title: this.translateService.instant('markWorkOrderItems'),
      message: this.translateService.instant(
        this.showOnlyUnsettled
          ? 'areYouSureYouWantToMarkAllWorkOrderItemsAsInvoiced'
          : 'areYouSureYouWantToMarkAllWorkOrderItemsAsUninvoiced'
      ),
    };
    this.sweetAlertService.openMeSweetAlert(sweetAlertModel);
  }

  bottomReachedHandler(): void {
    this.listEntities.requestNextPage();
  }

  hasPrivilege(privilege: string): boolean {
    return this.authStoreService.isAllowed(privilege);
  }

  viewUnsettled(): void {
    if (this.showOnlyUnsettled) {
      this.loadAllUnsettledWorkOrders();
    } else {
      this.listEntities.requestFirstPage();
    }
  }

  orderBy(order: 'ASC' | 'DESC'): void {
    this.searchFilter.ordering = order;
    this.listEntities.setFilter(this.searchFilter);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
