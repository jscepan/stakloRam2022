import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderSelectionItemComponent } from './work-order-selection-item.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from 'src/app/shared/modules/icons/icons.module';

@NgModule({
  declarations: [WorkOrderSelectionItemComponent],
  imports: [CommonModule, IconsModule, MatCheckboxModule, TranslateModule],
  exports: [WorkOrderSelectionItemComponent],
})
export class WorkOrderSelectionItemModule {}
