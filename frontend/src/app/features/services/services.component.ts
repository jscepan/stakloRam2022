import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCreatePopupService } from '@features/service-create-popup/service-create-popup.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SERVICE_STATUSES } from 'src/app/shared/constants';
import { EnumValueModel } from 'src/app/shared/enums/enum.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { ServiceModel } from 'src/app/shared/models/service.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { getServiceNumber } from 'src/app/shared/utils';
import { ServiceWebService } from 'src/app/web-services/service.web-service';
import { UserWebService } from 'src/app/web-services/user.web-service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [ServiceWebService, UserWebService, ServiceCreatePopupService],
})
export class ServicesComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  listEntities: ListEntities<ServiceModel> = new ListEntities<ServiceModel>();
  entities?: Observable<ServiceModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  length?: Observable<number | undefined> =
    this.listEntities.totalEntitiesLength;

  listEntitiesUsers: ListEntities<UserModel> = new ListEntities<UserModel>();
  userEntities?: Observable<UserModel[]> = this.listEntitiesUsers.entities;
  userIsLoading?: Observable<boolean> = this.listEntitiesUsers.isLoading;

  getServiceNumber = getServiceNumber;

  statusOptions: EnumValueModel[] = SERVICE_STATUSES;
  taskOID: string | null = null;

  searchFilter: SearchModel = new SearchModel();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private userWebService: UserWebService,
    private webService: ServiceWebService,
    private serviceCreatePopupService: ServiceCreatePopupService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.taskOID) {
        this.taskOID = params.taskOID;
      }
    });

    this.subs.sink = this.listEntities
      .setWebService(this.webService)
      .requestFirstPage();

    this.subs.sink = this.listEntitiesUsers
      .setWebService(this.userWebService)
      .requestFirstPage();
  }

  openService(service: ServiceModel): void {
    this.router.navigate(['services', 'edit', service.oid]);
  }

  searchTextHandler(text: string): void {
    this.searchFilter = { ...this.searchFilter, criteriaQuick: text };
    this.listEntities.setFilter(this.searchFilter);
  }

  statusTypeChanged(statuses: string[]): void {
    this.searchFilter = {
      ...this.searchFilter,
      attributes: [{ status: statuses }],
    };
    this.listEntities.setFilter(this.searchFilter);
  }

  userChanged(users: UserModel[]): void {
    const oids: string[] = users.map((user) => {
      return user.oid;
    });
    console.log('users oids:');
    console.log(oids);
    this.searchFilter = {
      ...this.searchFilter,
      objectsOIDS: [{ user: oids }],
    };
    this.listEntities.setFilter(this.searchFilter);
  }

  create(
    type: 'CASE' | 'TASK' | 'SUBTASK' = 'CASE',
    service?: ServiceModel
  ): void {
    this.subs.sink = this.serviceCreatePopupService
      .openDialog(type, service)
      .subscribe((service) => {
        if (service) {
          // TODO
          this.listEntities.requestFirstPage();
        }
      });
  }

  bottomReachedHandler(): void {
    this.listEntities.requestNextPage();
  }

  bottomReachedHandlerUsers(): void {
    this.listEntitiesUsers.requestNextPage();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
