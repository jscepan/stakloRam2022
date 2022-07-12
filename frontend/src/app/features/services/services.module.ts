import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { MatSelectModule } from '@angular/material/select';
import { ServiceEditModule } from '@features/services-edit/service-edit.module';
import { UserCardModule } from 'src/app/shared/components/user-card/user-card.module';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { ComponentLoadingModule } from 'src/app/shared/directives/component-loader/component-loader.module';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { ServiceCreateModule } from '@features/service-create-popup/service-create.module';

@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    TranslateModule,
    ButtonModule,
    SearchInputModule,
    MatSelectModule,
    ServiceEditModule,
    UserCardModule,
    MatSelectInfiniteScrollModule,
    ComponentLoadingModule,
    ScrollToBottomModule,
    ServiceCreateModule,
  ],
})
export class ServicesModule {}
