import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from 'src/app/shared/constants';
import { BaseModel } from 'src/app/shared/models/base-model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { constructUrl } from 'src/app/shared/utils';
import { ArrayResponseI } from '../interfaces/array-response.interface';
import { BaseWebService } from './base.web-service';

@Injectable({
  providedIn: 'root',
})
export abstract class EntityBaseWebService<T> {
  constructor(
    public baseWebService: BaseWebService,
    @Inject('') public ModelFromType: new () => T,
    @Inject('') public domainName: string
  ) {}

  searchEntities = (
    data: SearchModel,
    skip?: number,
    top?: number
  ): Observable<ArrayResponseI<T>> => {
    const url: string = constructUrl(
      `${BASE_API_URL + '/' + this.domainName}/search`,
      skip,
      top
    );
    return this.baseWebService.postRequestForArray<T, SearchModel>(
      url,
      data,
      this.ModelFromType
    );
  };

  createEntity = (data: T): Observable<T> => {
    return this.baseWebService.postRequest<T, T>(
      `${BASE_API_URL + '/' + this.domainName}`,
      data,
      this.ModelFromType
    );
  };

  updateEntity = (entityOID: string, data: T): Observable<T> => {
    return this.baseWebService.putRequest<T, T>(
      `${BASE_API_URL + '/' + this.domainName}/${encodeURI(entityOID)}`,
      data,
      this.ModelFromType
    );
  };

  deleteEntity = (data: BaseModel[]): Observable<void> => {
    return this.baseWebService.deleteRequest<void>(
      `${BASE_API_URL + '/' + this.domainName}`,
      data
    );
  };

  getEntityByOid = (oid: string): Observable<T> => {
    return this.baseWebService.getRequest<T>(
      `${BASE_API_URL + '/' + this.domainName}/${encodeURI(oid)}`,
      this.ModelFromType
    );
  };
}
