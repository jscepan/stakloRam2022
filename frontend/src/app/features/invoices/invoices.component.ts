import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncomeCreateEditPopupService } from '@features/income-create-edit/income-create-edit-popup.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import {
  SweetAlertI,
  SweetAlertTypeEnum,
} from 'src/app/shared/components/sweet-alert/sweet-alert.interface';
import { SweetAlertService } from 'src/app/shared/components/sweet-alert/sweet-alert.service';
import { INVOICE_TYPES } from 'src/app/shared/constants';
import { EnumValueModel } from 'src/app/shared/enums/enum.model';
import { InvoiceModel } from 'src/app/shared/models/invoice.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { getTYPEDisplayValue } from 'src/app/shared/utils';
import { InvoiceWebService } from 'src/app/web-services/invoice.web-service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
  providers: [
    InvoiceWebService,
    ListEntities,
    IncomeCreateEditPopupService,
    SweetAlertService,
  ],
})
export class InvoicesComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  entities?: Observable<InvoiceModel[]> = this.listEntities.entities;
  typesOptions: EnumValueModel[] = INVOICE_TYPES;
  getTYPEDisplayValue = getTYPEDisplayValue;

  keyword: string = '';

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private webService: InvoiceWebService,
    private incomeCreateEditPopupService: IncomeCreateEditPopupService,
    private sweetAlertService: SweetAlertService,
    private listEntities: ListEntities<InvoiceModel>
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.listEntities
      .setWebService(this.webService)
      .setOrdering('DESC')
      .requestFirstPage();
  }

  inputSearchHandler(text: string): void {
    const searchFilter: SearchModel = new SearchModel();
    searchFilter.criteriaQuick = text;
    this.listEntities.setFilter(searchFilter);
  }

  create(): void {
    this.router.navigate(['invoices', 'create']);
  }

  editInvoice(invoiceOID: string): void {
    this.router.navigate(['invoices', 'edit', invoiceOID]);
  }

  deleteInvoice(invoice: InvoiceModel): void {
    this.subs.sink.$deleteInvoice = this.sweetAlertService
      .getDataBackFromSweetAlert()
      .subscribe((data) => {
        if (data && data.confirmed) {
          this.subs.sink = this.webService
            .deleteEntity([invoice])
            .subscribe(() => {
              this.globalService.showBasicAlert(
                MODE.success,
                this.translateService.instant('invoiceDeleted'),
                this.translateService.instant(
                  'invoiceHaveBeenSuccessfullyDeleted'
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
      title: this.translateService.instant('deleteInvoice'),
      message: this.translateService.instant(
        'areYouSureYouWantToDeleteTheInvoice'
      ),
    };
    this.sweetAlertService.openMeSweetAlert(sweetAlertModel);
  }

  createIncome(invoice: InvoiceModel): void {
    this.incomeCreateEditPopupService
      .openDialog(undefined, invoice.buyer, invoice.grossAmount)
      .subscribe(() => {});
  }

  createInvoiceFromPreInvoice(invoice: InvoiceModel): void {
    this.router.navigate(['invoices', 'create'], {
      queryParams: { preInvoiceOID: invoice.oid },
    });
  }

  createInvoiceFromAdvanceInvoice(invoice: InvoiceModel): void {
    this.router.navigate(['invoices', 'create'], {
      queryParams: { advanceInvoiceOID: invoice.oid },
    });
  }

  viewInvoice(invoiceOID: string): void {
    window.open('print/invoice-view/' + invoiceOID);
  }

  bottomReachedHandler(): void {
    this.listEntities.requestNextPage();
  }

  typeChanged(event: any): void {
    const searchFilter: SearchModel = new SearchModel();
    if (this.typesOptions.filter((el) => el.value === event.value).length) {
      searchFilter.attributes = [{ type: [event.value] }];
    }
    this.listEntities.setFilter(searchFilter);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
