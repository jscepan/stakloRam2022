import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { BasicAlertEventsTypes, BasicAlertI } from './basic-alert.interface';

@Component({
  selector: 'app-basic-alert',
  templateUrl: './basic-alert.component.html',
  styleUrls: ['./basic-alert.component.scss'],
})
export class BasicAlertComponent implements OnDestroy {
  @Output() eventOccurs: EventEmitter<{ eventName: string }> =
    new EventEmitter();

  readonly EVENT_TYPES = BasicAlertEventsTypes;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: BasicAlertI) {}

  customEvent(eventName: string): void {
    this.eventOccurs.emit({ eventName });
  }

  ngOnDestroy(): void {}
}
