import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutcomesRoutingModule } from './outcomes-routing.module';
import { OutcomesComponent } from './outcomes.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SweetAlertModule } from 'src/app/shared/components/sweet-alert/sweet-alert.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { ComponentLoadingModule } from 'src/app/shared/directives/component-loader/component-loader.module';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { OutcomeCreateEditModule } from '@features/outcome-create-edit/outcome-create-edit.module';

@NgModule({
  declarations: [OutcomesComponent],
  imports: [
    CommonModule,
    OutcomesRoutingModule,
    TranslateModule,
    ButtonModule,
    SweetAlertModule,
    SearchInputModule,
    ComponentLoadingModule,
    ScrollToBottomModule,
    OutcomeCreateEditModule,
  ],
})
export class OutcomesModule {}
