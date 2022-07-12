import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrintLayoutComponent } from './print-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PrintRoutingModule } from './print-routing.module';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SidebarModule } from 'src/app/shared/components/sidebar/sidebar.module';

@NgModule({
  declarations: [PrintLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatTooltipModule,
    PrintRoutingModule,
    SidebarModule,
  ],
  providers: [GlobalService],
})
export class PrintLayoutModule {}
