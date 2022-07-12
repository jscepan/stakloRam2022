import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[scrollToBottom]',
})
export class ScrollToBottomDirective implements OnInit {
  @Output() bottomReached: EventEmitter<void> = new EventEmitter();
  @HostBinding('class') className = 'scrollbar';
  // @HostBinding('style.overflow-y') get overflowY(): string {
  //   return 'scroll';
  // }

  private scrollDelay: number = 200;

  constructor(private component: ElementRef) {}

  ngOnInit(): void {
    fromEvent(this.component.nativeElement, 'scroll')
      .pipe(debounceTime(this.scrollDelay))
      .subscribe(() => {
        const element = this.component.nativeElement;
        if (
          element.offsetHeight + element.scrollTop + 10 >=
          element.scrollHeight
        ) {
          this.bottomReached.emit();
        }
      });
  }
}
