import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyersRoutingModule } from './buyers-routing.module';
import { BuyersComponent } from './buyers.component';
import { TranslateModule } from '@ngx-translate/core';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { BuyerCreateEditModule } from '@features/views/buyer-create-edit/buyer-create-edit.module';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { ComponentLoadingModule } from 'src/app/shared/directives/component-loader/component-loader.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [BuyersComponent],
  imports: [
    CommonModule,
    BuyersRoutingModule,
    TranslateModule,
    SearchInputModule,
    ButtonModule,
    BuyerCreateEditModule,
    ComponentLoadingModule,
    ScrollToBottomModule,
    MatProgressSpinnerModule,
  ],
})
export class BuyersModule {}
