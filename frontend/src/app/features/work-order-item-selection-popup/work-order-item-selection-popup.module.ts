import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { WorkOrderItemSelectionPopupComponent } from './work-order-item-selection-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ComponentLoadingModule } from 'src/app/shared/directives/component-loader/component-loader.module';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { IconsModule } from 'src/app/shared/modules/icons/icons.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WorkOrderItemSelectionPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ButtonModule,
    TranslateModule,
    SearchInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ComponentLoadingModule,
    ScrollToBottomModule,
    IconsModule,
    MatCheckboxModule,
    FormsModule,
  ],
  exports: [WorkOrderItemSelectionPopupComponent],
  entryComponents: [WorkOrderItemSelectionPopupComponent],
})
export class WorkOrderItemSelectionPopupModule {}
