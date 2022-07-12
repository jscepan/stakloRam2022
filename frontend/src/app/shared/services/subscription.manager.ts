import { Subscription, Subscriber } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export class SubscriptionManager {
  private readonly _subs: { [key: string]: Subscription } = {};

  private readonly _subsHandler: { [key: string]: Subscription } = new Proxy(
    this._subs,
    {
      get: (subs: { [key: string]: Subscription }, prop: string) => {
        return subs[prop];
      },
      set: (
        subs: { [key: string]: Subscription },
        prop: string,
        value: Subscription
      ) => {
        if (subs[prop]) {
          subs[prop].unsubscribe();
        }
        subs[prop] = value;
        return true;
      },
    }
  );

  // tslint:disable-next-line: no-any
  public get sink(): any {
    return this._subsHandler;
  }

  // tslint:disable-next-line: no-any
  public set sink(subscription: any) {
    this._subs[uuidv4()] = subscription;
  }

  public unsubscribe(): void {
    for (const prop in this._subs) {
      if (
        this._subs.hasOwnProperty(prop) &&
        this._subs[prop] &&
        this._subs[prop] instanceof Subscriber
      ) {
        this._subs[prop].unsubscribe();
      }
    }
  }
}
