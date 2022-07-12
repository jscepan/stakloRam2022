import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SubscriptionManager } from '../../shared/services/subscription.manager';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ErrorResponseI } from 'src/app/shared/services/error-response.interface';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  manualHandledPaths: string[] = ['/auth/login'];

  public subs: SubscriptionManager = new SubscriptionManager();

  constructor(private globalService: GlobalService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.isNotManualHandled(request.url)) {
      return next.handle(request).pipe(
        catchError((error: ErrorResponseI) => {
          this.errorHandler(error);
          return throwError(error);
        })
      );
    }
    return next.handle(request);
  }

  private isNotManualHandled(path: string): boolean {
    return this.manualHandledPaths.every((elem) => path.indexOf(elem) === -1);
  }

  private errorHandler(errorResponse: ErrorResponseI): void {
    this.globalService.showBasicAlertDefaultError(errorResponse);
  }
}
