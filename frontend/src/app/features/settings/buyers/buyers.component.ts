import { Component, OnDestroy, OnInit } from '@angular/core';
import { BuyerCreateEditPopupService } from '@features/settings/buyer-create-edit/buyer-create-edit-popup.service';
import { Observable } from 'rxjs';
import { BuyerModel } from 'src/app/shared/models/buyer.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { BuyerWebService } from 'src/app/web-services/buyer.web-service';

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.scss'],
  providers: [BuyerWebService, BuyerCreateEditPopupService, ListEntities],
})
export class BuyersComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  entities?: Observable<BuyerModel[]> = this.listEntities.entities;

  keyword: string = '';

  constructor(
    private buyerCreateEditPopupService: BuyerCreateEditPopupService,
    private webService: BuyerWebService,
    private listEntities: ListEntities<BuyerModel>
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

  createBuyer(): void {
    this.buyerCreateEditPopupService.openDialog().subscribe((buyer) => {
      if (buyer) {
        this.listEntities.requestFirstPage();
      }
    });
  }

  editBuyer(oid: string): void {
    this.buyerCreateEditPopupService.openDialog(oid).subscribe((buyer) => {
      if (buyer) {
        this.listEntities.requestFirstPage();
      }
    });
  }

  bottomReachedHandler(): void {
    this.listEntities.requestNextPage();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
