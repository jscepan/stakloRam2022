import { BehaviorSubject, Observable } from 'rxjs';
import { ArrayResponseI } from 'src/app/core/interfaces/array-response.interface';
import { EntityBaseWebService } from 'src/app/core/services/entity-base.web-service';
import { BaseModel } from '../models/base-model';
import { SearchModel } from '../models/search.model';

export class ListEntities<T extends BaseModel> {
  private entities$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private totalEntitiesLength$: BehaviorSubject<number | undefined> =
    new BehaviorSubject<number | undefined>(undefined);
  private bottomReached$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public entities: Observable<T[]> = this.entities$.asObservable();
  public totalEntitiesLength: Observable<number | undefined> =
    this.totalEntitiesLength$.asObservable();
  public isLoading: Observable<boolean> = this.isLoading$.asObservable();

  private searchModel: SearchModel = new SearchModel();

  private NUMBER_OF_ITEMS_ON_PAGE: number = 50;

  private webService?: EntityBaseWebService<T>;

  get numberOfItemsOnPage(): number {
    return this.NUMBER_OF_ITEMS_ON_PAGE;
  }

  public constructor() {}

  public setWebService(webService: EntityBaseWebService<T>): ListEntities<T> {
    this.webService = webService;
    return this;
  }

  public setFilter(searchFilter: SearchModel): void {
    this.searchModel = searchFilter;
    this.requestFirstPage();
  }

  public requestFirstPage(): void {
    this.bottomReached$.next(false);
    this.entities$.next([]);
    this.totalEntitiesLength$.next(0);
    this.requestNextPage();
  }

  public requestNextPage(): void {
    if (!this.bottomReached$.getValue()) {
      this.isLoading$.next(true);
      this.webService
        ?.searchEntities(
          this.searchModel,
          this.entities$.getValue().length || 0,
          this.NUMBER_OF_ITEMS_ON_PAGE
        )
        .subscribe((response: ArrayResponseI<T>) => {
          this.entities$.next(
            this.entities$.getValue().concat(response.entities)
          );
          const length = this.entities$.getValue().length || 0;
          this.bottomReached$.next(!(length < response.totalCount));
          this.totalEntitiesLength$.next(response.totalCount);
          this.isLoading$.next(false);
        });
    }
  }
}
