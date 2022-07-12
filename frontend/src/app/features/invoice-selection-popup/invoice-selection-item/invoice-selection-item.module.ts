import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceSelectionItemComponent } from './invoice-selection-item.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from 'src/app/shared/modules/icons/icons.module';

@NgModule({
  declarations: [InvoiceSelectionItemComponent],
  imports: [CommonModule, IconsModule, MatCheckboxModule, TranslateModule],
  exports: [InvoiceSelectionItemComponent],
})
export class InvoiceSelectionItemModule {}
