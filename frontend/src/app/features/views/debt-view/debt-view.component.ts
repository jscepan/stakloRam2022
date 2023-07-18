import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IncomeCreateEditPopupService } from '@features/income-create-edit/income-create-edit-popup.service';
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
  providers: [CountryWebService, ViewsWebService, IncomeCreateEditPopupService],
})
export class DebtViewComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  buyerOID: string | null = null;
  entity?: DebtorModel;
  isLoading?: boolean = true;
  debtView!: DebtView;
  formGroup: UntypedFormGroup = new UntypedFormGroup({
    fromDate: new UntypedFormControl('', [Validators.required]),
    toDate: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    private webService: ViewsWebService,
    private route: ActivatedRoute,
    private incomeCreateEditPopupService: IncomeCreateEditPopupService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.buyerOID = this.route.snapshot.paramMap.get('buyerOID');
    this.refreshData();
  }

  refreshData(): void {
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

  currentYear(): void {
    this.formGroup
      .get('fromDate')
      ?.setValue(new Date().getFullYear() + '-01-01');
    this.formGroup
      .get('toDate')
      ?.setValue(new Date().toISOString().substring(0, 10));
    this.formGroup.markAsDirty();
  }

  dateChange(): void {
    const fromDate = this.formGroup.get('fromDate')?.value;
    const toDate = this.formGroup.get('toDate')?.value;
    if (
      (fromDate && !toDate) ||
      (fromDate && toDate && new Date(toDate) < new Date(fromDate))
    ) {
      this.formGroup
        .get('toDate')
        ?.setValue(this.formGroup.get('fromDate')?.value);
    }
  }

  viewDebtor(): void {
    this.convertDebtorToTransactions(
      this.formGroup.get('fromDate')?.value,
      this.formGroup.get('toDate')?.value
    );
  }

  convertDebtorToTransactions(fromDate?: Date, toDate?: Date): void {
    this.debtView = {
      startAmount: 0,
      owedSum: 0,
      debtSum: 0,
      transactions: [],
    };
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
      } else if (fromDate && fromDate > invoice.dateOfCreate) {
        this.debtView.startAmount += invoice.grossAmount;
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
        this.debtView.owedSum -= income.amount;
      } else if (fromDate && fromDate > income.date) {
        this.debtView.startAmount -= income.amount;
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
          description:
            this.translateService.instant('outcome') + ', ' + outcome.comment,
          owed: outcome.amount,
          debt: 0,
          state: 0,
        });
        this.debtView.debtSum += outcome.amount;
      } else if (fromDate && fromDate > outcome.date) {
        this.debtView.startAmount += outcome.amount;
      }
    });
    this.debtView.transactions = this.debtView.transactions.sort((a, b) => {
      return Number(new Date(a.date)) - Number(new Date(b.date));
    });

    for (let i = 0; i < this.debtView.transactions.length; i++) {
      if (i === 0) {
        this.debtView.transactions[i].state =
          this.debtView.transactions[i].owed -
          this.debtView.transactions[i].debt +
          this.debtView.startAmount;
      } else {
        this.debtView.transactions[i].state =
          this.debtView.transactions[i - 1].state +
          this.debtView.transactions[i].owed -
          this.debtView.transactions[i].debt;
      }
    }
  }

  createIncome(): void {
    this.subs.sink = this.incomeCreateEditPopupService
      .openDialog('', this.buyerOID || undefined)
      .subscribe((income) => {
        if (income) {
          this.refreshData();
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
