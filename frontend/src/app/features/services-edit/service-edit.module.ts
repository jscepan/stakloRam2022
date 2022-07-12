import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceEditRoutingModule } from './service-edit-routing.module';
import { ServiceEditComponent } from './service-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { BuyerCreateEditModule } from '@features/settings/buyer-create-edit/buyer-create-edit.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IconsModule } from 'src/app/shared/modules/icons/icons.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { UserCardModule } from 'src/app/shared/components/user-card/user-card.module';

@NgModule({
  declarations: [ServiceEditComponent],
  imports: [
    CommonModule,
    ServiceEditRoutingModule,
    TranslateModule,
    ButtonModule,
    BuyerCreateEditModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    SearchInputModule,
    IconsModule,
    MatSelectInfiniteScrollModule,
    NgxMatSelectSearchModule,
    UserCardModule,
  ],
  exports: [ServiceEditComponent],
})
export class ServiceEditModule {}
