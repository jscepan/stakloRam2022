import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { IconsModule } from '../../modules/icons/icons.module';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    IconsModule,
    MatDialogModule,
    TranslateModule,
  ],
  exports: [MenuComponent],
})
export class MenuModule {}
