import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncomeCreateEditPopupService } from '@features/income-create-edit/income-create-edit-popup.service';
import { OutcomeCreateEditPopupService } from '@features/outcome-create-edit/outcome-create-edit-popup.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import {
  SweetAlertI,
  SweetAlertTypeEnum,
} from 'src/app/shared/components/sweet-alert/sweet-alert.interface';
import { SweetAlertService } from 'src/app/shared/components/sweet-alert/sweet-alert.service';
import { IncomeModel } from 'src/app/shared/models/income.model';
import {
  BettweenAttribute,
  SearchModel,
} from 'src/app/shared/models/search.model';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { IncomeWebService } from 'src/app/web-services/income.web-service';
@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
  providers: [
    IncomeWebService,
    SweetAlertService,
    ListEntities,
    IncomeCreateEditPopupService,
  ],
})
export class IncomesComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  entities?: Observable<IncomeModel[]> = this.listEntities.entities;
  totalEntitiesLength?: Observable<number | undefined> =
    this.listEntities.totalEntitiesLength;

  keyword: string = '';

  searchFilter: SearchModel = new SearchModel();

  constructor(
    private globalService: GlobalService,
    private translateService: TranslateService,
    private webService: IncomeWebService,
    private sweetAlertService: SweetAlertService,
    private listEntities: ListEntities<IncomeModel>,
    private router: Router,
    private incomeCreateEditPopupService: IncomeCreateEditPopupService,
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
    } else {
      this.searchFilter.clearAllBetweenAttributes();
    }
    this.listEntities.setFilter(this.searchFilter);
  }

  outcomes(): void {
    this.router.navigate(['outcomes']);
  }

  createIncome(): void {
    this.incomeCreateEditPopupService.openDialog().subscribe((income) => {
      if (income) {
        this.listEntities.requestFirstPage();
      }
    });
  }

  editIncome(incomeOID: string): void {
    this.incomeCreateEditPopupService
      .openDialog(incomeOID)
      .subscribe((income) => {
        if (income) {
          this.listEntities.requestFirstPage();
        }
      });
  }

  deleteIncome(income: IncomeModel): void {
    this.subs.sink.$deleteIncome = this.sweetAlertService
      .getDataBackFromSweetAlert()
      .subscribe((data) => {
        if (data && data.confirmed) {
          this.subs.sink = this.webService
            .deleteEntity([income])
            .subscribe(() => {
              this.globalService.showBasicAlert(
                MODE.success,
                this.translateService.instant('incomeDeleted'),
                this.translateService.instant(
                  'incomeHaveBeenSuccessfullyDeleted'
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
      title: this.translateService.instant('deleteIncome'),
      message: this.translateService.instant(
        'areYouSureYouWantToDeleteTheIncome'
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
