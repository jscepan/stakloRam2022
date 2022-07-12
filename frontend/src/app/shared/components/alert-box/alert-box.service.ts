import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ComponentType } from '@angular/cdk/overlay';
import { BasicAlertComponent } from '../basic-alert/basic-alert.component';
import { BasicAlertI } from '../basic-alert/basic-alert.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertBoxService {
  public showMsg$: Subject<{
    // tslint:disable-next-line:no-any
    component: ComponentType<any>;
    alertData: BasicAlertI;
    duration: number;
  }> = new Subject();

  constructor() {}

  showBasicAlert(basicAlertData: BasicAlertI, duration: number = 7000): void {
    this._showMessage(BasicAlertComponent, basicAlertData, duration);
  }

  private _showMessage(
    // tslint:disable-next-line:no-any
    component: ComponentType<any>,
    alertData: BasicAlertI,
    duration: number
  ): void {
    this.showMsg$.next({ component, alertData, duration });
  }
}
