import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerCreateEditComponent } from './buyer-create-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from 'src/app/shared/modules/icons/icons.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [BuyerCreateEditComponent],
  imports: [
    CommonModule,
    TranslateModule,
    IconsModule,
    ButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    ScrollToBottomModule,
    MatSelectInfiniteScrollModule,
    NgxMatSelectSearchModule,
  ],
  entryComponents: [BuyerCreateEditComponent],
})
export class BuyerCreateEditModule {}
