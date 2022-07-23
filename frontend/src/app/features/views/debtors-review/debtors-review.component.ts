import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DebtorModel } from 'src/app/shared/models/debtor.model';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { searchInText } from 'src/app/shared/utils';
import { CountryWebService } from 'src/app/web-services/country.web-service';
import { ViewsWebService } from 'src/app/web-services/views.web-service';

@Component({
  selector: 'app-debtors-review',
  templateUrl: './debtors-review.component.html',
  styleUrls: ['./debtors-review.component.scss'],
  providers: [CountryWebService, ViewsWebService],
})
export class DebtorsReviewComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  allDebtors: DebtorModel[] = [];
  entities: DebtorModel[] = [];
  isLoading?: boolean = true;

  constructor(private webService: ViewsWebService, private router: Router) {}

  ngOnInit(): void {
    this.webService.getAllDebtors().subscribe((allDebtors) => {
      this.allDebtors = allDebtors;
      this.entities = allDebtors;
      this.isLoading = true;
    });
  }

  viewDebtor(item: DebtorModel): void {
    window.open('print/debtor/' + item.buyer?.oid);
  }

  inputSearchHandler(text: string): void {
    this.entities = [];
    this.allDebtors.forEach((debtor) => {
      if (searchInText(text, [debtor.buyer?.name || ''])) {
        this.entities.push(debtor);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
