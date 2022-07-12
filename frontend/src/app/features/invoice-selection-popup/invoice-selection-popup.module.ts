import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { InvoiceSelectionItemModule } from './invoice-selection-item/invoice-selection-item.module';
import { TranslateModule } from '@ngx-translate/core';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { InvoiceSelectionPopupComponent } from './invoice-selection-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ComponentLoadingModule } from 'src/app/shared/directives/component-loader/component-loader.module';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';

@NgModule({
  declarations: [InvoiceSelectionPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ButtonModule,
    InvoiceSelectionItemModule,
    TranslateModule,
    SearchInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ComponentLoadingModule,
    ScrollToBottomModule,
  ],
  exports: [InvoiceSelectionPopupComponent],
  entryComponents: [InvoiceSelectionPopupComponent],
})
export class InvoiceSelectionPopupModule {}
