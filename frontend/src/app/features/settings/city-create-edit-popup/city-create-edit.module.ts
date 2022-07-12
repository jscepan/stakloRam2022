import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityCreateEditComponent } from './city-create-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from 'src/app/shared/modules/icons/icons.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [CityCreateEditComponent],
  imports: [
    CommonModule,
    TranslateModule,
    IconsModule,
    ButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSelectInfiniteScrollModule,
    NgxMatSelectSearchModule,
  ],
  entryComponents: [CityCreateEditComponent],
})
export class CityCreateEditModule {}
