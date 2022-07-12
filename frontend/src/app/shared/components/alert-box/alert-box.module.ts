import { NgModule } from '@angular/core';
import { AlertBoxComponent } from './alert-box.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { BasicAlertModule } from '../basic-alert/basic-alert.module';

@NgModule({
  declarations: [AlertBoxComponent],
  imports: [CommonModule, TranslateModule, BasicAlertModule],
  exports: [AlertBoxComponent],
  providers: [
    {
      provide: MAT_SNACK_BAR_DATA,
      useValue: {},
    },
  ],
})
export class AlertBoxModule {}
