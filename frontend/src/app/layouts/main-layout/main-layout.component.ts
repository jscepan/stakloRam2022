import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import {
  SidebarI,
  SidebarNavItemI,
} from 'src/app/shared/components/sidebar/sidebar.interface';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { UserWebService } from 'src/app/web-services/user.web-service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  providers: [UserWebService, LocalStorageService],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  sidebar!: SidebarI;

  constructor(
    private router: Router,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private authStoreService: AuthStoreService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    let navItems: SidebarNavItemI[] = [
      {
        id: 'dashboard',
        title: this.translateService.instant('dashboard'),
        icon: 'home',
        activated: false,
      },
      {
        id: 'invoices',
        title: this.translateService.instant('invoices'),
        icon: 'credit-card',
        activated: false,
        hidden: !this.authStoreService.isAllowed('INVOICES_VIEW'),
      },
      {
        id: 'work-orders',
        title: this.translateService.instant('workOrder'),
        icon: 'activity',
        activated: false,
        hidden: !this.authStoreService.isAllowed('WORK_ORDERS_VIEW'),
      },
      {
        id: 'incomes',
        title: this.translateService.instant('incomes'),
        icon: 'dollar-sign',
        activated: false,
        hidden: !this.authStoreService.isAllowed('INCOMES_VIEW'),
      },
      {
        id: 'views',
        title: this.translateService.instant('views'),
        icon: 'eye',
        activated: false,
        children: [
          {
            id: 'views/buyers',
            title: this.translateService.instant('buyers'),
            icon: 'user',
            activated: false,
            hidden: !this.authStoreService.isAllowed('BUYERS_VIEW'),
          },
          {
            id: 'views/countries',
            title: this.translateService.instant('countries'),
            icon: 'globe',
            activated: false,
            hidden: !this.authStoreService.isAllowed('COUNTRIES_VIEW'),
          },
          {
            id: 'views/cities',
            title: this.translateService.instant('cities'),
            icon: 'case',
            activated: false,
            hidden: !this.authStoreService.isAllowed('CITIES_VIEW'),
          },
          {
            id: 'views/debtors-review',
            title: this.translateService.instant('debtorsReview'),
            icon: 'minus-circle',
            activated: false,
            hidden: !this.authStoreService.isAllowed('DEBTORS_VIEW'),
          },
          {
            id: 'views/histories',
            title: this.translateService.instant('histories'),
            icon: 'minus-circle',
            activated: false,
            hidden: !this.authStoreService.isAllowed('HISTORIES_VIEW'),
          },
        ],
      },
      {
        id: 'users',
        title: this.translateService.instant('users'),
        icon: 'users',
        activated: false,
        hidden: !this.authStoreService.isAllowed('USERS_VIEW'),
      },
      {
        id: 'settings/application',
        title: this.translateService.instant('settings'),
        icon: 'settings',
        activated: false,
        hidden: !this.authStoreService.isAllowed('SETTINGS_VIEW'),
      },
    ];
    this.sidebar = {
      isExpanded: false,
      isCollapsible: true,
      logoUrl: '/assets/images/me-logo.png',
      navItems: navItems,
    };
  }

  changeLanguage(language: string): void {
    this.languageService.changeLanguage(language);
  }

  toggleSidebar(): void {
    this.sidebar = { ...this.sidebar, isExpanded: !this.sidebar.isExpanded };
  }

  sidebarEvents(event: any): void {
    if (event.eventName === 'changeLanguage') {
      this.languageService.changeLanguage(event.payload);
      location.reload();
    } else if (event.eventName === 'logout') {
      this.logout();
    } else if (event.eventName === 'passwordChange') {
      this.router.navigate(['settings', 'password-change']);
    } else if (event.eventName === 'userProfile') {
      this.router.navigate(['settings', 'user-profile']);
    } else {
      let selectedNavItem: SidebarNavItemI | undefined;
      this.sidebar.navItems.forEach((item) => {
        if (item.id === event.payload.navItemId) {
          selectedNavItem = item;
          return;
        }
        if (item.children?.length) {
          item.children.forEach((child) => {
            if (child.id === event.payload.navItemId) {
              selectedNavItem = child;
              return;
            }
          });
        }
      });
      if (selectedNavItem) {
        if (selectedNavItem?.children?.length) {
          this.sidebar = {
            ...this.sidebar,
            isExpanded: true,
            navItems: this.sidebar.navItems.map((item) => {
              return {
                ...item,
                activated: item.id === event.payload.navItemId,
              };
            }),
          };
        } else {
          this.sidebar = {
            ...this.sidebar,
            isExpanded: false,
            navItems: this.sidebar.navItems.map((item) => {
              return {
                ...item,
                activated: item.id === event.payload.navItemId,
              };
            }),
          };
          this.router.navigateByUrl(event.payload.navItemId);
        }
      }
    }
  }

  logout(): void {
    this.router.navigate(['auth/login']);
    this.authStoreService.canceledURL = null;
    this.authStoreService.user = null;
    this.authStoreService.canceledURL = null;
    this.localStorageService.remove('jwt');
  }

  ngOnDestroy(): void {}
}
