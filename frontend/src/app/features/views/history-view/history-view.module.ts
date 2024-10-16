import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryViewComponent } from './history-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { BuyerCreateEditModule } from '@features/views/buyer-create-edit/buyer-create-edit.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NumberDecimalModule } from 'src/app/shared/directives/number-decimal/number-decimal.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [HistoryViewComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    BuyerCreateEditModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSelectInfiniteScrollModule,
    NgxMatSelectSearchModule,
    NumberDecimalModule,
    MatProgressSpinnerModule,
  ],
})
export class HistoryViewModule {}
