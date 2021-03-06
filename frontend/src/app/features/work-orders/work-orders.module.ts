import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrdersRoutingModule } from './work-orders-routing.module';
import { WorkOrdersComponent } from './work-orders.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SweetAlertModule } from 'src/app/shared/components/sweet-alert/sweet-alert.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { ComponentLoadingModule } from 'src/app/shared/directives/component-loader/component-loader.module';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { IncomeCreateEditModule } from '@features/income-create-edit/income-create-edit.module';

@NgModule({
  declarations: [WorkOrdersComponent],
  imports: [
    CommonModule,
    WorkOrdersRoutingModule,
    TranslateModule,
    ButtonModule,
    SweetAlertModule,
    SearchInputModule,
    ComponentLoadingModule,
    ScrollToBottomModule,
    IncomeCreateEditModule,
  ],
})
export class WorkOrdersModule {}
