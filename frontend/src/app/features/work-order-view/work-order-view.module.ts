import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderViewRoutingModule } from './work-order-view-routing.module';
import { WorkOrderViewComponent } from './work-order-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';
import { SettingsModule } from '@features/settings/settings.module';

@NgModule({
  declarations: [WorkOrderViewComponent],
  imports: [
    CommonModule,
    WorkOrderViewRoutingModule,
    TranslateModule,
    ButtonModule,
    MatDialogModule,
    SettingsModule,
    QRCodeModule,
  ],
})
export class WorkOrderViewModule {}
