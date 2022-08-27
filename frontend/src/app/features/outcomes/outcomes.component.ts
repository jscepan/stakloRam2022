import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OutcomeCreateEditPopupService } from '@features/outcome-create-edit/outcome-create-edit-popup.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import {
  SweetAlertI,
  SweetAlertTypeEnum,
} from 'src/app/shared/components/sweet-alert/sweet-alert.interface';
import { SweetAlertService } from 'src/app/shared/components/sweet-alert/sweet-alert.service';
import { OutcomeModel } from 'src/app/shared/models/outcome.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { OutcomeWebService } from 'src/app/web-services/outcome.web-service';
@Component({
  selector: 'app-outcomes',
  templateUrl: './outcomes.component.html',
  styleUrls: ['./outcomes.component.scss'],
  providers: [
    OutcomeWebService,
    SweetAlertService,
    ListEntities,
    OutcomeCreateEditPopupService,
  ],
})
export class OutcomesComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  entities?: Observable<OutcomeModel[]> = this.listEntities.entities;

  keyword: string = '';

  constructor(
    private globalService: GlobalService,
    private translateService: TranslateService,
    private webService: OutcomeWebService,
    private sweetAlertService: SweetAlertService,
    private router: Router,
    private listEntities: ListEntities<OutcomeModel>,
    private outcomeCreateEditPopupService: OutcomeCreateEditPopupService
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

  incomes(): void {
    this.router.navigate(['incomes']);
  }

  create(): void {
    this.outcomeCreateEditPopupService.openDialog().subscribe((outcome) => {
      if (outcome) {
        this.listEntities.requestFirstPage();
      }
    });
  }

  editOutcome(outcomeOID: string): void {
    this.outcomeCreateEditPopupService
      .openDialog(outcomeOID)
      .subscribe((outcome) => {
        if (outcome) {
          this.listEntities.requestFirstPage();
        }
      });
  }

  deleteOutcome(outcome: OutcomeModel): void {
    this.subs.sink.$deleteOutcome = this.sweetAlertService
      .getDataBackFromSweetAlert()
      .subscribe((data) => {
        if (data && data.confirmed) {
          this.subs.sink = this.webService
            .deleteEntity([outcome])
            .subscribe(() => {
              this.globalService.showBasicAlert(
                MODE.success,
                this.translateService.instant('outcomeDeleted'),
                this.translateService.instant(
                  'outcomeHaveBeenSuccessfullyDeleted'
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
      title: this.translateService.instant('deleteOutcome'),
      message: this.translateService.instant(
        'areYouSureYouWantToDeleteTheOutcome'
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
