import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebtViewComponent } from './debt-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CountryCreateEditModule } from '../country-create-edit/country-create-edit.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { ComponentLoadingModule } from 'src/app/shared/directives/component-loader/component-loader.module';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { DebtViewRoutingModule } from './debt-view-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [DebtViewComponent],
  imports: [
    CommonModule,
    DebtViewRoutingModule,
    TranslateModule,
    ButtonModule,
    MatDialogModule,
    CountryCreateEditModule,
    SearchInputModule,
    ComponentLoadingModule,
    ScrollToBottomModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class DebtViewModule {}
