import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-ellipsis-row',
  templateUrl: './ellipsis-row.component.html',
  styleUrls: ['./ellipsis-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EllipsisRowComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input() text: string = '';
  @Input() disableTooltip: boolean = false;

  @ViewChild('ellipsisContainer')
  ellipsisContainer: ElementRef<HTMLElement> | null = null;
  @ViewChild('ellipsisContent')
  ellipsisContent: ElementRef<HTMLElement> | null = null;
  private _showToolTip: boolean = false;

  private _listenForWindowResizeSubscription!: Subscription;

  set showToolTip(val: boolean) {
    this._showToolTip = val;
  }

  get showToolTip(): boolean {
    return this._showToolTip;
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  private checkShowToolTip(): void {
    if (this.ellipsisContainer && this.ellipsisContent) {
      const container: HTMLElement = this.ellipsisContainer.nativeElement;
      const content: HTMLElement = this.ellipsisContent.nativeElement;
      this.showToolTip = container.offsetWidth < content.offsetWidth;
    }
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.checkShowToolTip();
    this.listenForWindowResize();
  }

  ngOnChanges(): void {
    setTimeout(() => {
      this.checkShowToolTip();
    });
  }

  listenForWindowResize(): void {
    this._listenForWindowResizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.checkShowToolTip();
      });
  }

  ngOnDestroy(): void {
    if (this._listenForWindowResizeSubscription) {
      this._listenForWindowResizeSubscription.unsubscribe();
    }
  }
}
