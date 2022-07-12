import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuItemI } from './menu-item.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() menuItems: MenuItemI[] = [];
  @Input() isNested: boolean = false;
  @Input() menuTrigger!: MatMenuTrigger;

  @Input() xPosition: 'before' | 'after' = 'before';
  @Input() yPosition: 'below' | 'above' = 'above';

  @Output() menuItemClickEvent: EventEmitter<{ event: Event; key: string }> =
    new EventEmitter();
  @ViewChild(MatMenu, { static: true }) menu!: MatMenu;

  private _takeUntilDestroy$: Subject<void> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.menuTrigger.menuOpened
      .pipe(takeUntil(this._takeUntilDestroy$))
      .subscribe(() => {
        fromEvent(document, 'click')
          .pipe(takeUntil(this.menuTrigger.menuClosed))
          .subscribe(() => {
            if (
              !this.isNested &&
              this.menuTrigger.menuOpen &&
              !this.menu._isAnimating
            ) {
              this.menuTrigger.closeMenu();
            }
          });
      });
  }

  itemKey(_index: number, item: { key: string }): string {
    return item.key;
  }

  menuItemClickHandler(data: { event: Event; key: string }): void {
    data.event.stopPropagation();
    this.menuItemClickEvent.emit(data);
    this.menuTrigger.closeMenu();
  }

  ignoreEvent(event: Event): void {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.menuTrigger.closeMenu();
    this._takeUntilDestroy$.next();
  }
}
