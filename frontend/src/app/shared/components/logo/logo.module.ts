import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LogoComponent],
  imports: [CommonModule, TranslateModule],
  exports: [LogoComponent],
})
export class LogoModule {}
