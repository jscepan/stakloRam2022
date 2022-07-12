import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../../modules/icons/icons.module';

import { BasicAlertComponent } from './basic-alert.component';
import { BasicAlertService } from './basic-alert.service';
@NgModule({
  imports: [CommonModule, RouterModule, IconsModule, MatSnackBarModule],
  exports: [BasicAlertComponent],
  declarations: [BasicAlertComponent],
  providers: [BasicAlertService],
})
export class BasicAlertModule {}
