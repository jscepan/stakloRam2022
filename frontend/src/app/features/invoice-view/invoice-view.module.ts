import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceViewRoutingModule } from './invoice-view-routing.module';
import { InvoiceViewComponent } from './invoice-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';
import { SettingsModule } from '@features/settings/settings.module';

@NgModule({
  declarations: [InvoiceViewComponent],
  imports: [
    CommonModule,
    InvoiceViewRoutingModule,
    TranslateModule,
    ButtonModule,
    MatDialogModule,
    SettingsModule,
    QRCodeModule,
  ],
})
export class InvoiceViewModule {}
