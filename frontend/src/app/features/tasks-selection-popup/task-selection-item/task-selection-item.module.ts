import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskSelectionItemComponent } from './task-selection-item.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from 'src/app/shared/modules/icons/icons.module';

@NgModule({
  declarations: [TaskSelectionItemComponent],
  imports: [CommonModule, IconsModule, MatCheckboxModule, TranslateModule],
  exports: [TaskSelectionItemComponent],
})
export class TaskSelectionItemModule {}
