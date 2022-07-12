import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

@NgModule({
  declarations: [],
  imports: [CommonModule, FeatherModule.pick(allIcons)],
  exports: [FeatherModule],
})
export class IconsModule {}
