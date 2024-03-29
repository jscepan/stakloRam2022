import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebtorsReviewComponent } from './debtors-review.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CountryCreateEditModule } from '../country-create-edit/country-create-edit.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { DebtorsReviewRoutingModule } from './debtors-review-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [DebtorsReviewComponent],
  imports: [
    CommonModule,
    DebtorsReviewRoutingModule,
    TranslateModule,
    ButtonModule,
    MatDialogModule,
    CountryCreateEditModule,
    SearchInputModule,
    ScrollToBottomModule,
    MatProgressSpinnerModule,
  ],
})
export class DebtorsReviewModule {}
