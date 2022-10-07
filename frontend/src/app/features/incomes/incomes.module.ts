import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomesRoutingModule } from './incomes-routing.module';
import { IncomesComponent } from './incomes.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SweetAlertModule } from 'src/app/shared/components/sweet-alert/sweet-alert.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { IncomeCreateEditModule } from '@features/income-create-edit/income-create-edit.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [IncomesComponent],
  imports: [
    CommonModule,
    IncomesRoutingModule,
    TranslateModule,
    ButtonModule,
    SweetAlertModule,
    SearchInputModule,
    ScrollToBottomModule,
    IncomeCreateEditModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class IncomesModule {}
