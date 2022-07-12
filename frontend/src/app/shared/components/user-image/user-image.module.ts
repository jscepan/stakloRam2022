import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserImageComponent } from './user-image.component';
import { IconsModule } from '../../modules/icons/icons.module';

@NgModule({
  declarations: [UserImageComponent],
  imports: [CommonModule, IconsModule],
  exports: [UserImageComponent],
})
export class UserImageModule {}
