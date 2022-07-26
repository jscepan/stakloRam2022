import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceCreateEditRoutingModule } from './invoice-create-edit-routing.module';
import { InvoiceCreateEditComponent } from './invoice-create-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { BuyerCreateEditModule } from '@features/views/buyer-create-edit/buyer-create-edit.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { IconsModule } from 'src/app/shared/modules/icons/icons.module';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { InvoiceSelectionPopupModule } from '@features/invoice-selection-popup/invoice-selection-popup.module';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NumberDecimalModule } from 'src/app/shared/directives/number-decimal/number-decimal.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { WorkOrderSelectionPopupModule } from '@features/work-order-selection-popup/work-order-selection-popup.module';
import { WorkOrderItemSelectionPopupModule } from '@features/work-order-item-selection-popup/work-order-item-selection-popup.module';

@NgModule({
  declarations: [InvoiceCreateEditComponent],
  imports: [
    CommonModule,
    InvoiceCreateEditRoutingModule,
    TranslateModule,
    ButtonModule,
    BuyerCreateEditModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    InvoiceSelectionPopupModule,
    MatChipsModule,
    IconsModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    MatSelectInfiniteScrollModule,
    NumberDecimalModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    WorkOrderSelectionPopupModule,
    WorkOrderItemSelectionPopupModule,
  ],
})
export class InvoiceCreateEditModule {}
