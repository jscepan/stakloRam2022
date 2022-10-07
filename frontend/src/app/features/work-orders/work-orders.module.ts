import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrdersRoutingModule } from './work-orders-routing.module';
import { WorkOrdersComponent } from './work-orders.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SweetAlertModule } from 'src/app/shared/components/sweet-alert/sweet-alert.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { IncomeCreateEditModule } from '@features/income-create-edit/income-create-edit.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [WorkOrdersComponent],
  imports: [
    CommonModule,
    WorkOrdersRoutingModule,
    TranslateModule,
    ButtonModule,
    SweetAlertModule,
    SearchInputModule,
    ScrollToBottomModule,
    IncomeCreateEditModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule,
  ],
})
export class WorkOrdersModule {}
