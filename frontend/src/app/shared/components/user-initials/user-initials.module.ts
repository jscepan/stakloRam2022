import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInitialsComponent } from './user-initials.component';

@NgModule({
  declarations: [UserInitialsComponent],
  imports: [CommonModule],
  exports: [UserInitialsComponent],
})
export class UserInitialsModule {}
