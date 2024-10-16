import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesRoutingModule } from './cities-routing.module';
import { CitiesComponent } from './cities.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CityCreateEditModule } from '../city-create-edit-popup/city-create-edit.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [CitiesComponent],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    TranslateModule,
    ButtonModule,
    MatDialogModule,
    CityCreateEditModule,
    SearchInputModule,
    ScrollToBottomModule,
    MatProgressSpinnerModule,
  ],
})
export class CitiesModule {}
