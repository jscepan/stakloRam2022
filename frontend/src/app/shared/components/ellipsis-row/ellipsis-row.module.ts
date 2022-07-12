import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EllipsisRowComponent } from './ellipsis-row.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [EllipsisRowComponent],
  imports: [MatTooltipModule, CommonModule],
  exports: [EllipsisRowComponent],
})
export class EllipsisRowModule {}
