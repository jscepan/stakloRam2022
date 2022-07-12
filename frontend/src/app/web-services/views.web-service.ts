import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseWebService } from '../core/services/base.web-service';
import { BASE_API_URL } from '../shared/constants';
import { DebtorModel } from '../shared/models/debtor.model';

@Injectable({
  providedIn: 'root',
})
export class ViewsWebService {
  constructor(
    public baseWebService: BaseWebService // @Inject('') public ModelFromType: new () => T, // @Inject('') public domainName: string
  ) {}

  // getEntityByOid = (oid: string): Observable<T> => {
  //   return this.baseWebService.getRequest<T>(
  //     `${BASE_API_URL + '/' + this.domainName}/${encodeURI(oid)}`,
  //     this.ModelFromType
  //   );
  // };

  getAllDebtors(): Observable<DebtorModel[]> {
    return this.baseWebService.getRequest<DebtorModel[]>(
      `${BASE_API_URL + '/views/debtors'}`
      // this.ModelFromType
    );
  }

  getDebtor(buyerOID: string): Observable<DebtorModel> {
    return this.baseWebService.getRequest<DebtorModel>(
      `${BASE_API_URL + '/views/debtors'}/${encodeURI(buyerOID)}`
      // this.ModelFromType
    );
  }
}
