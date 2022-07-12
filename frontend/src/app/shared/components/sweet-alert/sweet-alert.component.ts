import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SweetAlertI, SweetAlertTypeEnum } from './sweet-alert.interface';

@Component({
  selector: 'app-sweet-alert',
  templateUrl: './sweet-alert.component.html',
  styleUrls: ['./sweet-alert.component.scss'],
})
export class SweetAlertComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sweetAlertForm') sweetForm!: NgForm;
  @Output() eventOccurs: EventEmitter<{
    eventName: string;
    payload: SweetAlertI;
  }> = new EventEmitter();

  submitButtonDisabled: boolean = false;

  private _statusSubscritpion!: Subscription;

  enabledCheckbox: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: SweetAlertI) {}

  toLowerCase = (str?: string) => {
    return str?.toLowerCase();
  };

  ngAfterViewInit(): void {
    if (this.data.type.name === SweetAlertTypeEnum.input) {
      this._statusSubscritpion = this.sweetForm.form.statusChanges.subscribe(
        (result) => {
          if (result === 'INVALID') {
            this.submitButtonDisabled = true;
          } else {
            this.submitButtonDisabled = false;
          }
        }
      );
    }
  }

  customEvent(eventName: string, payload: SweetAlertI): void {
    this.eventOccurs.emit({ eventName, payload });
  }

  ngOnDestroy(): void {
    if (this._statusSubscritpion) {
      this._statusSubscritpion.unsubscribe();
    }
  }
}
