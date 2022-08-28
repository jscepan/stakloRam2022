import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { UserWebService } from 'src/app/web-services/user.web-service';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.scss'],
  providers: [],
})
export class PrintLayoutComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  constructor(
    private userWebService: UserWebService,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.userWebService.getUserProfile().subscribe((user) => {
      this.authStoreService.user = user;
    });
  }

  ngOnDestroy(): void {}
}
