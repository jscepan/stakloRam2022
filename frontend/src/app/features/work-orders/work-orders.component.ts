import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import {
  SweetAlertI,
  SweetAlertTypeEnum,
} from 'src/app/shared/components/sweet-alert/sweet-alert.interface';
import { SweetAlertService } from 'src/app/shared/components/sweet-alert/sweet-alert.service';
import { SearchModel } from 'src/app/shared/models/search.model';
import { WorkOrderModel } from 'src/app/shared/models/work-order';
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

  keyword: string = '';

  getWorkOrderNumber = getWorkOrderNumber;

  constructor(
    private globalService: GlobalService,
    private translateService: TranslateService,
    private webService: WorkOrderWebService,
    private sweetAlertService: SweetAlertService,
    private listEntities: ListEntities<WorkOrderModel>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.listEntities
      .setWebService(this.webService)
      .requestFirstPage();
  }

  inputSearchHandler(text: string): void {
    const searchFilter: SearchModel = new SearchModel();
    searchFilter.criteriaQuick = text;
    this.listEntities.setFilter(searchFilter);
  }

  createWorkOrder(): void {
    this.router.navigate(['work-orders', 'create']);
  }

  viewWorkOrder(workOrderOID: string): void {
    window.open('print/work-order-view/' + workOrderOID);
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

  bottomReachedHandler(): void {
    this.listEntities.requestNextPage();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
