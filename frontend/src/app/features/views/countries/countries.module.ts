import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CountryCreateEditModule } from '../country-create-edit/country-create-edit.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [CountriesComponent],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    TranslateModule,
    ButtonModule,
    MatDialogModule,
    CountryCreateEditModule,
    SearchInputModule,
    MatProgressSpinnerModule,
    ScrollToBottomModule,
  ],
})
export class CountriesModule {}
