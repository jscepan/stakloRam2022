import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceCreateEditRoutingModule } from './work-order-create-edit-routing.module';
import { WorkOrderCreateEditComponent } from './work-order-create-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { BuyerCreateEditModule } from '@features/views/buyer-create-edit/buyer-create-edit.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { IconsModule } from 'src/app/shared/modules/icons/icons.module';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NumberDecimalModule } from 'src/app/shared/directives/number-decimal/number-decimal.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [WorkOrderCreateEditComponent],
  imports: [
    CommonModule,
    InvoiceCreateEditRoutingModule,
    TranslateModule,
    ButtonModule,
    BuyerCreateEditModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    IconsModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    MatSelectInfiniteScrollModule,
    MatCheckboxModule,
    NumberDecimalModule,
    MatAutocompleteModule,
  ],
})
export class WorkOrderCreateEditModule {}
