import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountryCreateEditPopupService } from '../country-create-edit/country-create-edit-popup.service';
import { Observable } from 'rxjs';
import { CountryModel } from 'src/app/shared/models/country.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { CountryWebService } from 'src/app/web-services/country.web-service';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: [CountryWebService, CountryCreateEditPopupService, ListEntities],
})
export class CountriesComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  entities?: Observable<CountryModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  totalEntitiesLength?: Observable<number | undefined> =
    this.listEntities.totalEntitiesLength;

  keyword: string = '';

  constructor(
    private countryCreateEditPopupService: CountryCreateEditPopupService,
    private webService: CountryWebService,
    private listEntities: ListEntities<CountryModel>,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.listEntities
      .setWebService(this.webService)
      .requestFirstPage();
  }

  hasPrivilege(privilege: string): boolean {
    return this.authStoreService.isAllowed(privilege);
  }

  inputSearchHandler(text: string): void {
    const searchFilter: SearchModel = new SearchModel();
    searchFilter.criteriaQuick = text;
    this.listEntities.setFilter(searchFilter);
  }

  createCountry(): void {
    this.countryCreateEditPopupService.openDialog().subscribe((country) => {
      if (country) {
        this.listEntities.requestFirstPage();
      }
    });
  }

  editCountry(oid: string): void {
    this.countryCreateEditPopupService.openDialog(oid).subscribe((country) => {
      if (country) {
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
