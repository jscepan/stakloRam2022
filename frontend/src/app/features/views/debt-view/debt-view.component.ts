import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DebtorModel } from 'src/app/shared/models/debtor.model';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { getTYPEDisplayValue } from 'src/app/shared/utils';
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
  debtView!: DebtView;
  formGroup: FormGroup = new FormGroup({
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
  });

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

  viewDebtor(): void {
    this.convertDebtorToTransactions(
      this.formGroup.get('fromDate')?.value,
      this.formGroup.get('toDate')?.value
    );
  }

  convertDebtorToTransactions(fromDate?: Date, toDate?: Date): void {
    this.debtView = { owedSum: 0, debtSum: 0, transactions: [] };
    const dateFilter: boolean = !!fromDate && !!toDate;
    this.entity?.invoices?.forEach((invoice) => {
      if (
        !dateFilter ||
        (dateFilter &&
          fromDate &&
          toDate &&
          fromDate <= invoice.dateOfCreate &&
          invoice.dateOfCreate <= toDate)
      ) {
        this.debtView.transactions.push({
          date: invoice.dateOfCreate,
          description:
            this.translateService.instant(getTYPEDisplayValue(invoice.type)) +
            ': ' +
            invoice.number,
          owed: invoice.grossAmount,
          debt: 0,
          state: 0,
        });
        this.debtView.debtSum += invoice.grossAmount;
      }
    });
    this.entity?.incomes?.forEach((income) => {
      if (
        !dateFilter ||
        (dateFilter &&
          fromDate &&
          toDate &&
          fromDate <= income.date &&
          income.date <= toDate)
      ) {
        this.debtView.transactions.push({
          date: income.date,
          description:
            this.translateService.instant('income') +
            (income.comment ? ', ' + income.comment : '') +
            (income.bankStatementNumber
              ? ', Izvod: ' + income.bankStatementNumber
              : ''),
          debt: income.amount,
          owed: 0,
          state: 0,
        });
        this.debtView.owedSum += income.amount;
      }
    });
    this.entity?.outcomes?.forEach((outcome) => {
      if (
        !dateFilter ||
        (dateFilter &&
          fromDate &&
          toDate &&
          fromDate <= outcome.date &&
          outcome.date <= toDate)
      ) {
        this.debtView.transactions.push({
          date: outcome.date,
          description: this.translateService.instant('outcome'),
          owed: outcome.amount,
          debt: 0,
          state: 0,
        });
        this.debtView.debtSum += outcome.amount;
      }
    });
    this.debtView.transactions = this.debtView.transactions.sort((a, b) => {
      return Number(new Date(a.date)) - Number(new Date(b.date));
    });

    for (let i = 0; i < this.debtView.transactions.length; i++) {
      if (i === 0) {
        this.debtView.transactions[i].state =
          this.debtView.transactions[i].owed -
          this.debtView.transactions[i].debt;
      } else {
        this.debtView.transactions[i].state =
          this.debtView.transactions[i - 1].state +
          this.debtView.transactions[i].owed -
          this.debtView.transactions[i].debt;
      }
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
