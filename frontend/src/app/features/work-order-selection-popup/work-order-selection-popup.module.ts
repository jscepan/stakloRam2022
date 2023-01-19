import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { WorkOrderSelectionPopupComponent } from './work-order-selection-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { WorkOrderSelectionItemModule } from './work-order-selection-item/work-order-selection-item.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [WorkOrderSelectionPopupComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        ButtonModule,
        TranslateModule,
        SearchInputModule,
        MatFormFieldModule,
        MatSelectModule,
        ScrollToBottomModule,
        WorkOrderSelectionItemModule,
        MatProgressSpinnerModule,
    ],
    exports: [WorkOrderSelectionPopupComponent]
})
export class WorkOrderSelectionPopupModule {}
