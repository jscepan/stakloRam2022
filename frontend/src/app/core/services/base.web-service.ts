import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { ArrayResponseI } from '../interfaces/array-response.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BaseWebService {
  private jwt?: string;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getRequest<T>(url: string, classType?: Type<T>): Observable<T> {
    const options = this.addOptionsForRequest();
    return this.http.get<T>(url, options).pipe(
      map((res) => {
        return classType ? plainToClass(classType, res as T) : (res as T);
      })
    );
  }

  getRequestForArrayBuffer<T>(url: string, classType?: Type<T>): Observable<T> {
    const options = this.addOptionsForRequestForArrayBuffer();
    return this.http.get<T>(url, options).pipe(
      map((res) => {
        return classType ? plainToClass(classType, res as T) : (res as T);
      })
    );
  }

  getRequestForArray<T>(
    url: string,
    classType: Type<T>
  ): Observable<ArrayResponseI<T>> {
    const options = this.addOptionsForRequest();
    return this.http.get<ArrayResponseI<T>>(url, options).pipe(
      map((res) => {
        const result: ArrayResponseI<T> = {
          entities: res.entities
            ? res.entities.map((entity: T) => plainToClass(classType, entity))
            : [],
          nextID: res.nextID,
          totalCount: res.totalCount,
        };
        return result;
      })
    );
  }

  postRequest<T, K>(
    url: string,
    data?: K,
    classType?: Type<T>,
    headers?: object
  ): Observable<T> {
    const options = this.addOptionsForRequest(headers);
    return this.http.post<T>(url, data, options).pipe(
      map((res) => {
        return classType ? plainToClass(classType, res as T) : res;
      })
    );
  }

  // // tslint:disable-next-line:no-any
  // postRequestWithProgress<K>(url: string, data?: K, headers?: object): Observable<HttpEvent<any>> {
  //   let options = this.addOptionsForRequest(headers);
  //   options = { ...options, reportProgress: true, observe: 'events' };
  //   // tslint:disable-next-line:no-any
  //   return this.http.post<HttpEvent<any>>(url, data, options);
  // }

  postRequestForArray<T, K>(
    url: string,
    data: K,
    classType: Type<T>
  ): Observable<ArrayResponseI<T>> {
    const options = this.addOptionsForRequest();
    return this.http.post<ArrayResponseI<T>>(url, data, options).pipe(
      map((res) => {
        const result: ArrayResponseI<T> = {
          entities: res.entities
            ? res.entities.map((entity: T) => plainToClass(classType, entity))
            : [],
          nextID: res.nextID,
          totalCount: res.totalCount,
        };
        return result;
      })
    );
  }

  putRequest<T, K>(url: string, data: K, classType?: Type<T>): Observable<T> {
    const options = this.addOptionsForRequest();
    return this.http.put<T>(url, data, options).pipe(
      map((res) => {
        return classType ? plainToClass(classType, res as T) : res;
      })
    );
  }

  deleteRequest<T>(
    url: string,
    bodyParams?: unknown,
    classType?: Type<T>
  ): Observable<T> {
    // need to add body params to DELETE request because backend is not completely in RESTful standard
    const options = bodyParams
      ? this.addOptionsForRequest({}, 'json', bodyParams)
      : this.addOptionsForRequest();
    return this.http.delete<T>(url, options).pipe(
      map((res) => {
        return classType ? plainToClass(classType, res as T) : res;
      })
    );
  }

  private addOptionsForRequest(
    additionalHeaders?: object,
    responseType: string = 'json',
    body?: unknown
  ): object {
    const authorization: string = this.jwt
      ? ''
      : this.localStorageService.get('jwt');
    // Create headers
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: authorization,
      ...additionalHeaders,
    });
    const options = {
      headers,
      responseType,
      reportProgress: false,
      observe: 'body',
      withCredentials: false,
      body,
    };
    // TODO remove this on the end - this is used now only for dev mode because of CORS policy...
    // options.withCredentials = true;

    return options;
  }

  private addOptionsForRequestForArrayBuffer(
    additionalHeaders?: object,
    responseType: string = 'arraybuffer',
    body?: unknown
  ): object {
    const authorization: string = this.jwt
      ? ''
      : this.localStorageService.get('jwt');
    // Create headers
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: authorization,
      ...additionalHeaders,
    });
    const options = {
      headers,
      responseType,
      reportProgress: false,
      observe: 'body',
      withCredentials: false,
      body,
    };
    // TODO remove this on the end - this is used now only for dev mode because of CORS policy...
    // options.withCredentials = true;

    return options;
  }
}
