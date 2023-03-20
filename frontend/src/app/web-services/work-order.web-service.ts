import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArrayResponseI } from '../core/interfaces/array-response.interface';
import { BaseWebService } from '../core/services/base.web-service';
import { EntityBaseWebService } from '../core/services/entity-base.web-service';
import { BASE_API_URL, DOMAIN_WORK_ORDERS } from '../shared/constants';
import { WorkOrderModel } from '../shared/models/work-order';

@Injectable()
export class WorkOrderWebService extends EntityBaseWebService<WorkOrderModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, WorkOrderModel, DOMAIN_WORK_ORDERS);
  }

  public getNextWorkOrderNumber(date: Date = new Date()) {
    date = new Date(date);
    return this.baseWebService.getRequest<string>(
      `${
        BASE_API_URL + '/' + this.domainName
      }/number?year=${date.getFullYear()}`
    );
  }

  public getAllWorkOrderItemDescriptions(): Observable<string[]> {
    return this.baseWebService.getRequest(
      `${BASE_API_URL + '/' + this.domainName}/workOrderItemDescriptions`
    );
  }

  public getAllUnsettledWorkOrderForBuyer(
    buyerOID: string
  ): Observable<WorkOrderModel[]> {
    return this.baseWebService.getRequest(
      `${BASE_API_URL + '/' + this.domainName}/unsettled?buyerOID=${buyerOID}`
    );
  }

  public changeWorkOrderSettledStatus(
    workOrderOID: string,
    settled: boolean
  ): Observable<WorkOrderModel[]> {
    return this.baseWebService.postRequest(
      `${
        BASE_API_URL + '/' + this.domainName
      }/unsettled?workOrderOID=${workOrderOID}&settled=${settled}`
    );
  }

  public changeBuyer(
    workOrderOID: string,
    buyerOID: string
  ): Observable<boolean> {
    return this.baseWebService.postRequest(
      `${
        BASE_API_URL + '/' + this.domainName
      }/change-buyer?workOrderOID=${workOrderOID}&buyerOID=${buyerOID}`
    );
  }

  uploadFile<T>(workOrderOID: string, data: FormData): Observable<T> {
    return this.baseWebService.postRequest<T, FormData>(
      `${BASE_API_URL + '/' + this.domainName}/${workOrderOID}/files`,
      data
    );
  }
}
