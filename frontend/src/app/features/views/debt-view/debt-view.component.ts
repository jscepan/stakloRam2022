import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DebtorModel } from 'src/app/shared/models/debtor.model';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { CountryWebService } from 'src/app/web-services/country.web-service';
import { ViewsWebService } from 'src/app/web-services/views.web-service';
import { DebtView } from './debt-view.interface';

@Component({
  selector: 'app-debt-view',
  templateUrl: './debt-view.component.html',
  styleUrls: ['./debt-view.component.scss'],
  providers: [CountryWebService, ViewsWebService],
})
export class DebtViewComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  buyerOID: string | null = null;
  entity?: DebtorModel;
  isLoading?: boolean = true;
  transactions: DebtView[] = [];

  constructor(
    private webService: ViewsWebService,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.buyerOID = this.route.snapshot.paramMap.get('buyerOID');
    if (this.buyerOID) {
      this.subs.sink = this.webService
        .getDebtor(this.buyerOID)
        .subscribe((entity) => {
          this.entity = entity;
          this.isLoading = false;
          this.convertDebtorToTransactions();
        });
    }
  }

  convertDebtorToTransactions(): void {
    this.entity?.invoices?.forEach((invoice) => {
      this.transactions.push({
        date: invoice.dateOfCreate,
        description:
          this.translateService.instant('invoice') + ': ' + invoice.number,
        owed: invoice.grossAmount,
        debt: 0,
        state: 0,
      });
    });
    this.entity?.incomes?.forEach((income) => {
      this.transactions.push({
        date: income.date,
        description: this.translateService.instant('income'),
        debt: income.amount,
        owed: 0,
        state: 0,
      });
    });
    this.entity?.outcomes?.forEach((outcome) => {
      this.transactions.push({
        date: outcome.date,
        description: this.translateService.instant('outcome'),
        owed: outcome.amount,
        debt: 0,
        state: 0,
      });
    });
    // this.transactions.sort(function (a, b) {
    //   return new Date(b.date) - new Date(a.date);
    // });

    for (let i = 0; i < this.transactions.length; i++) {
      if (i === 0) {
        this.transactions[i].state =
          this.transactions[i].owed - this.transactions[i].debt;
      } else {
        this.transactions[i].state =
          this.transactions[i - 1].state +
          this.transactions[i].owed -
          this.transactions[i].debt;
      }
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
