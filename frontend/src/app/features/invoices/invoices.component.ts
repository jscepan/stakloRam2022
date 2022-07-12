import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { InvoiceModel } from 'src/app/shared/models/invoice.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { InvoiceWebService } from 'src/app/web-services/invoice.web-service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
  providers: [InvoiceWebService, ListEntities],
})
export class InvoicesComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  entities?: Observable<InvoiceModel[]> = this.listEntities.entities;

  keyword: string = '';

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private webService: InvoiceWebService,
    private listEntities: ListEntities<InvoiceModel>
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

  create(): void {
    this.router.navigate(['invoices', 'create']);
  }

  editInvoice(invoiceOID: string): void {
    this.router.navigate(['invoices', 'edit', invoiceOID]);
  }

  viewInvoice(invoiceOID: string): void {
    window.open('print/invoice-view/' + invoiceOID);
  }

  bottomReachedHandler(): void {
    this.listEntities.requestNextPage();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
