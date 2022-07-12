import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { UserModel } from '../../models/user.model';
import { AuthStoreService } from '../../services/auth-store.service';
import { MenuItemI } from '../menu/menu-item.interface';
import { SidebarI, SidebarNavItemI } from './sidebar.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() dataModel: SidebarI = {
    // TODO refactor this component
    isExpanded: true,
    isCollapsible: true,
    logoUrl: '/assets/images/me-logo.png',
    navItems: [],
  };
  userMenuItems: MenuItemI[] = [];

  @Output() eventOccurs: EventEmitter<{
    eventName: string;
    payload: { [key: string]: string };
  }> = new EventEmitter();
  @Output() toggleSideBar: EventEmitter<void> = new EventEmitter();

  user: UserModel | null = null;

  constructor(
    private languageService: LanguageService,
    private translateService: TranslateService,
    private authStore: AuthStoreService
  ) {}

  ngOnInit(): void {
    this.userMenuItems.push(
      {
        key: 'passwordChange',
        displayName: this.translateService.instant('passwordChange'),
      },
      {
        key: 'userProfile',
        displayName: this.translateService.instant('userProfile'),
      },
      {
        key: 'logout',
        displayName: this.translateService.instant('logout'),
      }
    );
    this.user = this.authStore.user;
  }

  itemOid(_index: number, navItem: SidebarNavItemI): string {
    return navItem.id;
  }

  userEventHandler(event: any): void {
    this.eventOccurs.emit({
      eventName: event,
      payload: event,
    });
  }

  selectItem(item: SidebarNavItemI | null): void {
    if (item) {
      this.eventOccurs.emit({
        eventName: 'selectedItemId',
        payload: { navItemId: item.id },
      });
    }
  }

  toggleExpandableSidebar(): void {
    this.toggleSideBar.emit();
  }
}
