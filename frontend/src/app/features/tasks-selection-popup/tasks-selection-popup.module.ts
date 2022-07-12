import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TaskSelectionItemModule } from './task-selection-item/task-selection-item.module';
import { TranslateModule } from '@ngx-translate/core';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { TasksSelectionPopupComponent } from './tasks-selection-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { ComponentLoadingModule } from 'src/app/shared/directives/component-loader/component-loader.module';

@NgModule({
  declarations: [TasksSelectionPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ButtonModule,
    TaskSelectionItemModule,
    TranslateModule,
    SearchInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ComponentLoadingModule,
    ScrollToBottomModule,
  ],
  exports: [TasksSelectionPopupComponent],
  entryComponents: [TasksSelectionPopupComponent],
})
export class TasksSelectionPopupModule {}
