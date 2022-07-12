import { Component, OnDestroy, OnInit } from '@angular/core';
import { CityCreateEditPopupService } from '@features/settings/city-create-edit-popup/city-create-edit-popup.service';
import { CityModel } from 'src/app/shared/models/city.model';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { CityWebService } from 'src/app/web-services/city.web-service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { Observable } from 'rxjs';
import { SearchModel } from 'src/app/shared/models/search.model';

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

  keyword: string = '';

  constructor(
    private cityCreateEditPopupService: CityCreateEditPopupService,
    private webService: CityWebService,
    private listEntities: ListEntities<CityModel>
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
