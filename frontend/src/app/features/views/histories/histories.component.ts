import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryViewPopupService } from '@features/views/history-view/history-view-popup.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SweetAlertService } from 'src/app/shared/components/sweet-alert/sweet-alert.service';
import { ACTION_OBJECT_TYPES, OBJECT_TYPES } from 'src/app/shared/constants';
import { EnumValueModel } from 'src/app/shared/enums/enum.model';
import { HistoryModel } from 'src/app/shared/models/history.model';
import {
  BettweenAttribute,
  SearchModel,
} from 'src/app/shared/models/search.model';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { HistoryWebService } from 'src/app/web-services/history.web-service';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss'],
  providers: [
    HistoryWebService,
    SweetAlertService,
    ListEntities,
    HistoryViewPopupService,
  ],
})
export class HistoriesComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  typesOfObject: EnumValueModel[] = OBJECT_TYPES;
  actionTypesOfObject: EnumValueModel[] = ACTION_OBJECT_TYPES;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  entities?: Observable<HistoryModel[]> = this.listEntities.entities;
  totalEntitiesLength?: Observable<number | undefined> =
    this.listEntities.totalEntitiesLength;

  searchFilter: SearchModel = new SearchModel();

  constructor(
    private webService: HistoryWebService,
    private listEntities: ListEntities<HistoryModel>,
    private historyViewPopupService: HistoryViewPopupService
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.listEntities
      .setWebService(this.webService)
      .setOrdering('DESC')
      .requestFirstPage();
  }

  typeChange(type: EnumValueModel): void {
    if (type) {
      this.searchFilter.addBetweenAttribute({
        attribute: 'object_type',
        attributeType: 'STRING',
        attributeValue: type.value,
        type: 'EQUAL',
      });
      this.listEntities.setFilter(this.searchFilter);
    } else {
      this.searchFilter.removeBetweenAttribute('object_type');
      this.listEntities.setFilter(this.searchFilter);
    }
  }

  actionTypeChange(type: EnumValueModel): void {
    if (type) {
      const newBetweenAttribute: BettweenAttribute = {
        attribute: 'action',
        attributeValue: type.value,
        attributeType: 'STRING',
        type: 'EQUAL',
      };

      this.searchFilter.addBetweenAttribute(newBetweenAttribute);
    } else {
      this.searchFilter.removeBetweenAttribute('action');
    }
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
    } else if (type === 'from') {
      this.searchFilter.removeBetweenAttribute('from_date');
    } else if (type === 'to') {
      this.searchFilter.removeBetweenAttribute('to_date');
    }
    this.listEntities.setFilter(this.searchFilter);
  }

  inputSearchHandler(text: string): void {
    this.searchFilter.criteriaQuick = text;
    this.listEntities.setFilter(this.searchFilter);
  }

  viewHistoryDetails(historyOID: string): void {
    this.subs.sink = this.historyViewPopupService
      .openDialog(historyOID)
      .subscribe(() => {});
  }

  bottomReachedHandler(): void {
    this.listEntities.requestNextPage();
  }

  orderBy(order: 'ASC' | 'DESC'): void {
    this.searchFilter.ordering = order;
    this.listEntities.setFilter(this.searchFilter);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
