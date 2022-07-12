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
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchInputComponent implements OnInit, OnDestroy, OnChanges {
  @Input() keyword: string = '';
  @Input() placeholder: string = 'Search for...';
  @Input() debounceTime: number = 500;
  @Input() minCharacters: number = 1;
  @Output() changeEvent: EventEmitter<string> = new EventEmitter();

  searchInput: FormControl = new FormControl();

  private inputChangeSubscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.inputChangeSubscription = this.searchInput.valueChanges
      .pipe(debounceTime(this.debounceTime))
      .subscribe(() => {
        if (this.searchInput.value.length === 0) {
          this.changeEvent.emit(this.searchInput.value);
        } else if (this.searchInput.value.length >= this.minCharacters) {
          this.changeEvent.emit(this.searchInput.value);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.keyword && changes.keyword.previousValue) {
      if (changes.keyword.currentValue !== changes.keyword.previousValue) {
        // if the change is comming from outside we are not emiting, just setting the value
        this.searchInput.setValue(this.keyword, { emitEvent: false });
      }
    }
  }

  resetSearchInputValue(): void {
    this.searchInput.setValue('');
  }

  ngOnDestroy(): void {
    this.inputChangeSubscription.unsubscribe();
  }
}
