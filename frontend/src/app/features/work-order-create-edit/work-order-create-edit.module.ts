import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceCreateEditRoutingModule } from './work-order-create-edit-routing.module';
import { WorkOrderCreateEditComponent } from './work-order-create-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { BuyerCreateEditModule } from '@features/settings/buyer-create-edit/buyer-create-edit.module';
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

@NgModule({
  declarations: [WorkOrderCreateEditComponent],
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
  ],
})
export class WorkOrderCreateEditModule {}
