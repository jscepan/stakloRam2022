import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-number-setter',
  templateUrl: './number-setter.component.html',
  styleUrls: ['./number-setter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NumberSetterComponent implements OnInit, OnDestroy {
  @Input() placeholder: string = 'Calc.oth.';
  @Output() changeEvent: EventEmitter<string> = new EventEmitter();

  searchInput: FormControl = new FormControl(4);

  private inputChangeSubscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.inputChangeSubscription = this.searchInput.valueChanges.subscribe(
      () => {
        this.changeEvent.emit(this.searchInput.value);
      }
    );
  }

  changeValue(number: number): void {
    if (this.searchInput.value + number >= 0)
      this.searchInput.setValue(this.searchInput.value + number);
  }

  ngOnDestroy(): void {
    this.inputChangeSubscription.unsubscribe();
  }
}
