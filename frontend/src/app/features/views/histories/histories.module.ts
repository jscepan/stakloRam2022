import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriesRoutingModule } from './histories-routing.module';
import { HistoriesComponent } from './histories.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SweetAlertModule } from 'src/app/shared/components/sweet-alert/sweet-alert.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryViewModule } from '@features/views/history-view/history-view.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [HistoriesComponent],
  imports: [
    CommonModule,
    HistoriesRoutingModule,
    TranslateModule,
    ButtonModule,
    SweetAlertModule,
    SearchInputModule,
    ScrollToBottomModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    HistoryViewModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class HistoriesModule {}
