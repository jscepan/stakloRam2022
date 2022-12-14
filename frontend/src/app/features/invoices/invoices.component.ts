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
import {
  BettweenAttribute,
  SearchModel,
} from 'src/app/shared/models/search.model';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
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
  totalEntitiesLength?: Observable<number | undefined> =
    this.listEntities.totalEntitiesLength;
  typesOptions: EnumValueModel[] = INVOICE_TYPES;
  getTYPEDisplayValue = getTYPEDisplayValue;

  keyword: string = '';

  searchFilter: SearchModel = new SearchModel();

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private webService: InvoiceWebService,
    private incomeCreateEditPopupService: IncomeCreateEditPopupService,
    private sweetAlertService: SweetAlertService,
    private listEntities: ListEntities<InvoiceModel>,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit(): void {
    this.searchFilter.ordering = 'DESC';
    this.subs.sink = this.listEntities
      .setWebService(this.webService)
      .setOrdering('DESC')
      .requestFirstPage();
  }

  hasPrivilege(privilege: string): boolean {
    return this.authStoreService.isAllowed(privilege);
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

  orderBy(order: 'ASC' | 'DESC'): void {
    this.searchFilter.ordering = order;
    this.listEntities.setFilter(this.searchFilter);
  }

  inputSearchHandler(text: string): void {
    this.searchFilter.criteriaQuick = text;
    this.listEntities.setFilter(this.searchFilter);
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
      .openDialog(undefined, invoice.buyer.oid, invoice.grossAmount)
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
    window.open('#/print/invoice-view/' + invoiceOID);
  }

  bottomReachedHandler(): void {
    this.listEntities.requestNextPage();
  }

  typeChanged(event: any): void {
    if (this.typesOptions.filter((el) => el.value === event.value).length) {
      // this.searchFilter.attributes = [{ type: [event.value] }];
      this.searchFilter.addBetweenAttribute({
        attribute: 'type',
        attributeType: 'STRING',
        attributeValue: event.value,
        type: 'EQUAL',
      });
    } else {
      // this.searchFilter.attributes = [];
      this.searchFilter.removeBetweenAttribute('type');
    }
    this.listEntities.setFilter(this.searchFilter);
  }

  getSumFor(
    _invoices: InvoiceModel[] | null,
    _columnName: 'netPrice' | 'vatAmount' | 'grossAmount'
  ): number {
    if (_invoices === null) {
      return 0;
    }
    let sum: number = 0;
    switch (_columnName) {
      case 'netPrice':
        _invoices.forEach((i) => {
          sum += i.netAmount;
        });
        break;
      case 'vatAmount':
        _invoices.forEach((i) => {
          sum += i.vatAmount;
        });
        break;
      case 'grossAmount':
        _invoices.forEach((i) => {
          sum += i.grossAmount;
        });
        break;
    }
    return sum;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
