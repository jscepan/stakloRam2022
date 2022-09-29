import { Component, OnDestroy, OnInit } from '@angular/core';
import { CityCreateEditPopupService } from '../city-create-edit-popup/city-create-edit-popup.service';
import { CityModel } from 'src/app/shared/models/city.model';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { CityWebService } from 'src/app/web-services/city.web-service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { Observable } from 'rxjs';
import { SearchModel } from 'src/app/shared/models/search.model';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  providers: [CityCreateEditPopupService, CityWebService, ListEntities],
})
export class CitiesComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  entities?: Observable<CityModel[]> = this.listEntities.entities;
  totalEntitiesLength?: Observable<number | undefined> =
    this.listEntities.totalEntitiesLength;

  keyword: string = '';

  constructor(
    private cityCreateEditPopupService: CityCreateEditPopupService,
    private webService: CityWebService,
    private listEntities: ListEntities<CityModel>,
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

  createCity(): void {
    this.cityCreateEditPopupService.openDialog().subscribe((city) => {
      if (city) {
        this.listEntities.requestFirstPage();
      }
    });
  }

  editCity(oid: string): void {
    this.cityCreateEditPopupService.openDialog(oid).subscribe((city) => {
      if (city) {
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
